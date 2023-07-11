import TeacherLessonModel, {
  ITeacherLessonWithModulesDataType,
} from '../../models/teacher/teacher-lesson';

import TeacherLessonModuleModel, {
  ITeacherLessonModule,
} from '../../models/teacher/teacher-lesson-module';

import { lessonModuleResponse } from '../../constants/responseMessages';
import { toMilliseconds } from '../../utils/toMilliseconds';
import { exec } from 'child_process';

type FormatedDateAndDurationType = {
  _id: string;
  startDate: string;
  duration: string;
};

class TeacherLessonModuleService {
  isLessDate(newDate: string, date: string) {
    const newDateTime = new Date(newDate).getTime();
    const dateTime = new Date(date).getTime();
    return newDateTime < dateTime;
  }

  isEqualDate(newDate: string, date: string) {
    const newDateTime = new Date(newDate).getTime();
    const dateTime = new Date(date).getTime();
    return newDateTime === dateTime;
  }

  checkDateForModuleLesson(newDate: string, date: string) {
    if (this.isLessDate(newDate, date)) {
      throw new Error('Lesson module should start after lesson date and time');
    }
    if (this.isEqualDate(newDate, date)) {
      throw new Error('Lesson module should not be start when lesson start');
    }
  }

  existModuleInDateRange(
    date: string,
    modulesDates: FormatedDateAndDurationType[]
  ): boolean {
    const dateTime = new Date(date).getTime();
    let isExist = false;

    if (!modulesDates.length) return isExist;

    for (let item of modulesDates) {
      const { startDate, duration, _id } = item;
      const [durationH, durationM] = duration.split(':');
      const dateTimeItem =
        new Date(startDate).getTime() + toMilliseconds(+durationH, +durationM);

      if (dateTime < dateTimeItem) {
        isExist = true;
        break;
      }
    }

    return isExist;
  }

  getFormatedDateAndDurationFromModules(
    modules
  ): FormatedDateAndDurationType[] {
    return modules.map((item) => {
      return {
        _id: item._id,
        startDate: item.start_date,
        duration: item.duration_time,
      };
    });
  }

  async getModuleDates(lessonId: string) {
    const lessonFromDB =
      await TeacherLessonModel.findOne<ITeacherLessonWithModulesDataType>({
        _id: lessonId,
      })
        .populate('modules')
        .select('start_date time_start modules');

    return lessonFromDB;
  }

  async createLessonModule(lessonId: string, props: ITeacherLessonModule) {
    const lessonFromDB = await this.getModuleDates(lessonId);
    if (!lessonFromDB) throw new Error('Lesson does not find');

    this.checkDateForModuleLesson(props.start_date, lessonFromDB.start_date);

    const moduleDatesArray = this.getFormatedDateAndDurationFromModules(
      lessonFromDB.modules
    );

    if (this.existModuleInDateRange(props.start_date, moduleDatesArray)) {
      throw new Error(
        'This module can not create, date and time already booked'
      );
    }

    const teacherLessonModule = await new TeacherLessonModuleModel(props);
    await teacherLessonModule.save();

    await TeacherLessonModel.findOneAndUpdate(
      {
        _id: lessonId,
      },
      { $push: { modules: teacherLessonModule._id } }
    );

    return {
      message: lessonModuleResponse('create'),
      data: {
        startdate: props.start_date,
        durationtime: props.duration_time,
        arr: moduleDatesArray,
      },
    };
  }

  async updateLessonModule(
    lessonId: string,
    { _id, ...props }: ITeacherLessonModule
  ) {
    const lessonFromDB = await this.getModuleDates(lessonId);
    if (!lessonFromDB) throw new Error('Lesson does not find');

    this.checkDateForModuleLesson(props.start_date, lessonFromDB.start_date);

    const moduleDatesArray = this.getFormatedDateAndDurationFromModules(
      lessonFromDB.modules
    );

    await TeacherLessonModuleModel.findOneAndUpdate(
      {
        _id: _id,
      },
      { ...props },
      { new: true }
    );

    return {
      message: lessonModuleResponse('create'),
      data: moduleDatesArray,
    };
  }

  async deleteLessonModule(lessonId: string, lessonModuleId: string) {
    await TeacherLessonModuleModel.findOneAndDelete({
      _id: lessonModuleId,
    });

    await TeacherLessonModel.findOneAndUpdate(
      {
        _id: lessonId,
      },
      { $pull: { modules: lessonModuleId } },
      { new: true }
    );

    return {
      message: lessonModuleResponse('delete'),
    };
  }

  async getLessonModule(moduleId: string) {
    const teacherLessonModules = await TeacherLessonModuleModel.findOne({
      _id: moduleId,
    });
    return teacherLessonModules;
  }

  async getModulesFromLesson(lessonId: string) {
    const teacherLesson = await TeacherLessonModel.find({
      _id: lessonId,
    })
      .populate({
        path: 'modules',
        select: '_id topic rich_text start_date time_start duration_time',
        options: {
          sort: { start_date: 1 },
        },
      })
      .select('module')
      .exec()
      .then((posts) => {
        const postArray: ITeacherLessonModule[] = [];
        for (let item of posts) {
          const modules = item.modules as unknown as ITeacherLessonModule[];
          for (let module of modules) {
            postArray.push(module);
          }
        }

        return postArray;
      });

    return teacherLesson;
  }
}

export default new TeacherLessonModuleService();
