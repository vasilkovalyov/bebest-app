import ApiError from '../../utils/api-error';
import TeacherModel, {
  ITeacher,
  ITeacherAccountEditableProps,
} from '../../models/teacher/teacher.model';
import UserModel from '../../models/user.model';
import TeacherPersonalInfoModel from '../../models/teacher/teacher-personal-info';
import TeacherProgressAccountModel from '../../models/teacher/teacher-progress-account';
import TeacherPaymentCardModel from '../../models/teacher/teacher-payment-card';

import TeacherLessonModel, {
  ITeacherLesson,
} from '../../models/teacher/teacher-lesson';

import responseMessages, {
  lessonResponse,
} from '../../constants/responseMessages';

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
      message: lessonResponse('create'),
    };
  }

  async updateLesson(teacherId: string, props: ITeacherLesson) {
    await TeacherLessonModel.findOneAndUpdate(
      {
        teacher: teacherId,
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
    }).populate({
      path: 'subject',
      select: '_id subject',
    });

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
}

export default new TeacherLessonService();
