import TeacherLessonModel from '../../models/teacher/teacher-lesson';

import TeacherLessonModuleModel, {
  ITeacherLessonModule,
} from '../../models/teacher/teacher-lesson-module';

import { lessonModuleResponse } from '../../constants/responseMessages';

class TeacherLessonModuleService {
  async createLessonModule(lessonId: string, props: ITeacherLessonModule) {
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
    };
  }

  async updateLessonModule({ _id, ...props }: ITeacherLessonModule) {
    await TeacherLessonModuleModel.findOneAndUpdate(
      {
        _id: _id,
      },
      { ...props },
      { new: true }
    );

    return {
      message: lessonModuleResponse('create'),
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
