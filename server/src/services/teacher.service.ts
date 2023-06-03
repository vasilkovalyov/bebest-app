import ApiError from '../utils/api-error';
import TeacherModel, {
  TeacherAccountEditableModelType,
} from '../models/teacher.model';
import UserModel from '../models/user.model';
import TeacherPersonalnfoModel, {
  ITeacherCostPersonalLesson,
  ITeacherMainFieldsActivity,
  ITeacherWorkExperience,
} from '../models/teacher-personal-info';
import TeacherProgressAccountModel from '../models/teacher-progress-account';

import teacherProgressAccountService from '../services/teacher-progress-account';
import bcrypt from 'bcrypt';

class TeacherService {
  async removeUser(id: string) {
    const user = await UserModel.deleteOne({
      userId: id,
    });

    if (!user.deletedCount)
      throw ApiError.BadRequestError(`User with id ${id} not a found!`);

    await TeacherModel.deleteOne({
      _id: id,
    });
    await TeacherPersonalnfoModel.deleteOne({
      teacherId: id,
    });
    await TeacherProgressAccountModel.deleteOne({
      teacherId: id,
    });

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

    const teacherProgressAccount =
      await teacherProgressAccountService.getAccountProgress(id);

    if (!teacherModel) {
      throw ApiError.BadRequestError(`Teacher with id ${id} not a found!`);
    }

    return {
      _id: teacherModel._id,
      name: teacherModel.name,
      surname: teacherModel.surname,
      email: teacherModel.email,
      phone: teacherModel.phone,
      about: teacherModel.about,
      role: teacherModel.role,
      progress_account: teacherProgressAccount,
    };
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

    await teacherProgressAccountService.updateAccountInfo(id, {
      phone: response.phone,
      about: response.about,
    });

    return response;
  }

  async addMainFieldsActivity(id: string, props: ITeacherMainFieldsActivity) {
    const response = await TeacherPersonalnfoModel.findOneAndUpdate(
      { teacherId: id },
      { $push: { fields_activity: props } },
      { new: true }
    ).select('fields_activity');

    if (response && response.fields_activity.length === 1) {
      await teacherProgressAccountService.addMainActivity(id);
    }

    return {
      message: 'Teacher main fields activity add successfull!',
    };
  }

  async removeMainFieldsActivity(id: string, activityId: string) {
    const response = await TeacherPersonalnfoModel.findOneAndUpdate(
      {
        teacherId: id,
      },
      { $pull: { fields_activity: { _id: activityId } } },
      { new: true }
    );

    if (response && response.fields_activity.length === 0) {
      await teacherProgressAccountService.removeMainActivity(id);
    }
    return {
      message: 'Teacher main fields activity remove successfull!',
    };
  }

  async updatePersonalLessons(id: string, props: ITeacherCostPersonalLesson) {
    const response = await TeacherPersonalnfoModel.findOne({ teacherId: id });
    if (response) {
      await TeacherPersonalnfoModel.findOneAndUpdate(
        { teacherId: id },
        {
          personal_lessons: {
            ...props,
          },
        },
        { new: true }
      );
    } else {
      const teacherPersonalInfoResponse = await new TeacherPersonalnfoModel({
        teacherId: id,
        personal_lessons: props,
      });
      await teacherPersonalInfoResponse.save();
    }

    await teacherProgressAccountService.updatePriceLessons(id, props);

    return {
      message: 'Teacher personal lessons updated successfull!',
    };
  }

  async addWorkExperience(id: string, props: ITeacherWorkExperience) {
    const response = await TeacherPersonalnfoModel.findOne({ teacherId: id });
    if (response) {
      await TeacherPersonalnfoModel.findOneAndUpdate(
        { teacherId: id },
        { $push: { work_experience: props } },
        { new: true }
      );
    } else {
      const teacherPersonalInfoResponse = await new TeacherPersonalnfoModel({
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
    await TeacherPersonalnfoModel.findOneAndUpdate(
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
    const response = await TeacherPersonalnfoModel.findOne({
      teacherId: id,
    }).select('_id teacherId fields_activity personal_lessons work_experience');

    if (!response) {
      throw ApiError.BadRequestError(`Teacher with id ${id} not a found!`);
    }

    return response;
  }
}

export default new TeacherService();
