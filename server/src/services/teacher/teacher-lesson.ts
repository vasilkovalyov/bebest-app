import TeacherModel from '../../models/teacher/teacher.model';

import TeacherLessonModel, {
  ITeacherLesson,
} from '../../models/teacher/teacher-lesson';

import { lessonResponse } from '../../constants/responseMessages';
import { StudentShortInfoForLessonType } from '../../models/student/student.model';
import ApiError from '../../utils/api-error';

class TeacherLessonService {
  async createLesson(teacherId: string, props: ITeacherLesson) {
    const teacherLesson = await new TeacherLessonModel({
      ...props,
      teacher: teacherId,
    });
    await teacherLesson.save();

    await TeacherModel.findOneAndUpdate(
      {
        _id: teacherId,
      },
      { $push: { lessons: teacherLesson._id } }
    );

    return {
      _id: teacherLesson._id,
      message: lessonResponse('create'),
    };
  }

  async updateLesson(lessonId: string, props: ITeacherLesson) {
    const modules = await TeacherLessonModel.find({
      _id: lessonId,
    })
      .select('modules')
      .populate({
        path: 'modules',
      })
      .select('start_date')
      .exec()
      .then((posts) => {
        return posts?.map((item) => item.start_date);
      });

    const date = props.start_date;

    if (!this.hasEarlierDateInArray(date, modules)) {
      throw new Error('Lesson date should not bigger then modules dates');
    }

    await TeacherLessonModel.findOneAndUpdate(
      {
        _id: lessonId,
      },
      { ...props }
    );

    return {
      message: lessonResponse('update'),
    };
  }

  async deleteLesson(teacherId: string, lessonId: string) {
    const lesson = await TeacherLessonModel.deleteOne({
      _id: lessonId,
    });

    if (!lesson.deletedCount) {
      throw new Error('Lesson already deleted');
    }

    await TeacherModel.findOneAndUpdate(
      {
        _id: teacherId,
      },
      { $pull: { lessons: lessonId } }
    );

    return {
      message: lessonResponse('delete'),
    };
  }

  async getLesson(lessonId: string) {
    const teacherLesson = await TeacherLessonModel.findOne({
      _id: lessonId,
    })
      .populate({
        path: 'subject',
        select: '_id subject',
      })
      .populate({
        path: 'modules',
        select: '_id topic rich_text start_date time_start duration_time',
      })
      .select(
        'topic subject description start_date time_start duration_months duration_time max_users price is_free teacher type'
      );

    return teacherLesson;
  }

  async getUserLessons(teacherId: string) {
    const teacherLesson = await TeacherLessonModel.find({
      teacher: teacherId,
    }).populate({
      path: 'subject',
      select: '_id subject',
    });

    return teacherLesson;
  }

  async addStudentToLesson(lessonId: string, studentId: string) {
    const lesson = await TeacherLessonModel.findOne({
      _id: lessonId,
    });

    if (lesson?.max_users === lesson?.students.length) {
      throw ApiError.BadRequestError(
        `Lesson has max ${lesson?.max_users} students`
      );
    }
    const existStudent = lesson?.students.find(
      (item) => item.toString() === studentId
    );
    if (existStudent) {
      throw ApiError.BadRequestError(`Student already exist in lesson`);
    }
    await TeacherLessonModel.findOneAndUpdate(
      {
        _id: lessonId,
      },
      { $push: { students: studentId } }
    );
    return {
      message: 'student add success',
    };
  }

  async deleteStudentFromLesson(lessonId: string, studentId: string) {
    await TeacherLessonModel.findOneAndUpdate(
      {
        _id: lessonId,
      },
      { $pull: { students: studentId } }
    );
    return {
      message: 'student remove from lesson success',
    };
  }

  async getStudentsFromLesson(lessonId: string) {
    const students = await TeacherLessonModel.findOne({
      _id: lessonId,
    })
      .populate({
        path: 'students',
      })
      .select('students')
      .exec()
      .then((posts) => {
        const students = posts?.students;
        if (!students?.length) return [];
        const postArray: StudentShortInfoForLessonType[] = [];

        for (let item of students) {
          const props = item as unknown as StudentShortInfoForLessonType;
          postArray.push({
            _id: props._id,
            name: props.name,
            surname: props.surname,
            avatar: props.avatar,
          });
        }

        return postArray;
      });
    return students;
  }

  hasEarlierDateInArray(date: string, dateArr: string[]): boolean {
    const dateTime = new Date(date).getTime();
    let isEarlyDate = true;
    for (let key in dateArr) {
      const item = dateArr[key];
      const itemDateTime = new Date(item).getTime();
      if (dateTime >= itemDateTime) {
        isEarlyDate = false;
        break;
      }
    }
    return isEarlyDate;
  }
}

export default new TeacherLessonService();
