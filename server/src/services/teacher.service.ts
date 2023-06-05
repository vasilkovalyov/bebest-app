import { File } from 'buffer';
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
import { uploadAvatar } from '../utils/upload-file';

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
      '_id name surname email role phone about avatar'
    );

    if (!teacherModel) {
      throw ApiError.BadRequestError(`Teacher with id ${id} not a found!`);
    }

    const teacherProgressAccount =
      await teacherProgressAccountService.getAccountProgress(id);

    return {
      _id: teacherModel._id,
      name: teacherModel.name,
      avatar: teacherModel.avatar,
      surname: teacherModel.surname,
      email: teacherModel.email,
      phone: teacherModel.phone,
      about: teacherModel.about,
      role: teacherModel.role,
      progress_account: teacherProgressAccount,
    };
  }

  async uploadUserAvatar(id: string, file: File) {
    let avatarImage = '';
    if (file) {
      const res = await uploadAvatar(file);
      avatarImage = res.secure_url;
    }

    const response = await TeacherModel.findOneAndUpdate(
      { _id: id },
      {
        avatar: avatarImage,
      },
      { new: true }
    );

    if (!response)
      throw ApiError.BadRequestError('Teacher avatar did not update');

    const progressData = await TeacherProgressAccountModel.findOne({
      teacherId: id,
    });

    if (progressData && progressData.photo.value) {
      if (!response.avatar) return;
      await teacherProgressAccountService.addPhoto(id, response.avatar);
    }

    return {
      message: 'Teacher avatar update successfull!',
    };
  }

  async updateUserInfo(id: string, props: TeacherAccountEditableModelType) {
    const response = await TeacherModel.findOneAndUpdate(
      { _id: id },
      {
        ...props,
      },
      { new: true }
    ).select('phone about avatar');

    if (!response) throw ApiError.BadRequestError('Teacher did not update');

    await teacherProgressAccountService.updateAccountInfo(id, {
      phone: response.phone,
      about: response.about,
    });

    return {
      message: 'Teacher info update successfull!',
    };
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
    const response = await TeacherPersonalnfoModel.findOneAndUpdate(
      { teacherId: id },
      { $push: { work_experience: props } },
      { new: true }
    ).select('work_experience');

    if (response && response.work_experience.length === 1) {
      await teacherProgressAccountService.addWorkExperience(id);
    }

    return {
      message: 'Teacher work experience add successfull!',
    };
  }

  async removeWorkExperience(id: string, workExperienceId: string) {
    const response = await TeacherPersonalnfoModel.findOneAndUpdate(
      { teacherId: id },
      { $pull: { work_experience: { _id: workExperienceId } } },
      { new: true }
    ).select('work_experience');

    if (response && response.work_experience.length === 0) {
      await teacherProgressAccountService.removeWorkExperience(id);
    }

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
