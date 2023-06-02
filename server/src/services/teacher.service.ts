import ApiError from '../utils/api-error';
import TeacherModel, {
  TeacherAccountEditableModelType,
} from '../models/teacher.model';
import UserModel from '../models/user.model';
import TeacherPersonalnfo, {
  ITeacherCostPersonalLesson,
  ITeacherMainFieldsActivity,
  ITeacherWorkExperience,
} from '../models/teacher-personal-info';
import bcrypt from 'bcrypt';

class TeacherService {
  async removeUser(id: string) {
    const user = await UserModel.deleteOne({
      userId: id,
    });

    if (!user.deletedCount)
      throw ApiError.BadRequestError(`User with id ${id} not a found!`);

    const studentUser = await TeacherModel.deleteOne({
      _id: id,
    });

    if (!studentUser)
      throw ApiError.BadRequestError(`Teacher with id ${id} not a found!`);

    return true;
  }

  async changePassword(id: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const teacherModel = await TeacherModel.findByIdAndUpdate(
      { _id: id },
      {
        password: hashedPassword,
      },
      {
        new: true,
      }
    );

    if (!teacherModel)
      throw ApiError.BadRequestError(`Teacher with id ${id} not a found!`);

    return {
      message: 'Password has updated successfull!',
    };
  }

  async getUserInfo(id: string) {
    const teacherModel = await TeacherModel.findOne({ _id: id }).select(
      '_id name surname email role phone about'
    );

    if (!teacherModel) {
      throw ApiError.BadRequestError(`Teacher with id ${id} not a found!`);
    }

    return teacherModel;
  }

  async updateUserInfo(id: string, props: TeacherAccountEditableModelType) {
    const response = await TeacherModel.findOneAndUpdate(
      { _id: id },
      {
        ...props,
      },
      { new: true }
    ).select('_id name surname email phone about role');

    if (!response) throw ApiError.BadRequestError('Teacher did not update');

    return response;
  }

  async addMainFieldsActivity(id: string, props: ITeacherMainFieldsActivity) {
    const response = await TeacherPersonalnfo.findOne({ teacherId: id });
    if (response) {
      await TeacherPersonalnfo.findOneAndUpdate(
        { teacherId: id },
        { $push: { fields_activity: props } },
        { new: true }
      );
    } else {
      const teacherPersonalInfoResponse = await new TeacherPersonalnfo({
        teacherId: id,
        fields_activity: props,
      });
      await teacherPersonalInfoResponse.save();
    }
    return {
      message: 'Teacher main fields activity add successfull!',
    };
  }

  async removeMainFieldsActivity(userId: string, activityId: string) {
    await TeacherPersonalnfo.findOneAndUpdate(
      {
        teacherId: userId,
      },
      { $pull: { fields_activity: { _id: activityId } } },
      { new: true }
    );
    return {
      message: 'Teacher main fields activity remove successfull!',
    };
  }

  async updatePersonalLessons(id: string, props: ITeacherCostPersonalLesson) {
    const response = await TeacherPersonalnfo.findOne({ teacherId: id });
    if (response) {
      await TeacherPersonalnfo.findOneAndUpdate(
        { teacherId: id },
        {
          personal_lessons: {
            ...props,
          },
        },
        { new: true }
      );
    } else {
      const teacherPersonalInfoResponse = await new TeacherPersonalnfo({
        teacherId: id,
        personal_lessons: props,
      });
      await teacherPersonalInfoResponse.save();
    }
    return {
      message: 'Teacher personal lessons updated successfull!',
    };
  }

  async addWorkExperience(id: string, props: ITeacherWorkExperience) {
    const response = await TeacherPersonalnfo.findOne({ teacherId: id });
    console.log('response', response);
    if (response) {
      await TeacherPersonalnfo.findOneAndUpdate(
        { teacherId: id },
        { $push: { work_experience: props } },
        { new: true }
      );
    } else {
      const teacherPersonalInfoResponse = await new TeacherPersonalnfo({
        teacherId: id,
        work_experience: props,
      });
      await teacherPersonalInfoResponse.save();
    }
    return {
      message: 'Teacher work experience add successfull!',
    };
  }

  async removeWorkExperience(userId: string, workExperienceId: string) {
    await TeacherPersonalnfo.findOneAndUpdate(
      {
        teacherId: userId,
      },
      { $pull: { work_experience: { _id: workExperienceId } } },
      { new: true }
    );
    return {
      message: 'Teacher work experience remove successfull!',
    };
  }

  async getPersonalnfo(id: string) {
    const response = await TeacherPersonalnfo.findOne({ teacherId: id }).select(
      '_id teacherId fields_activity personal_lessons work_experience'
    );

    if (!response) {
      throw ApiError.BadRequestError(`Teacher with id ${id} not a found!`);
    }

    return response;
  }
}

export default new TeacherService();
