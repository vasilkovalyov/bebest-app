import { File } from 'buffer';
import ApiError from '../utils/api-error';
import TeacherModel, {
  IVideo,
  TeacherAccountEditableModelType,
} from '../models/teacher.model';
import UserModel from '../models/user.model';
import TeacherPersonalInfoModel, {
  ITeacherCostPersonalLesson,
  ITeacherMainFieldsActivity,
  ITeacherWorkExperience,
  ITeacherCertificate,
} from '../models/teacher-personal-info';
import TeacherProgressAccountModel from '../models/teacher-progress-account';

import teacherProgressAccountService from '../services/teacher-progress-account';
import bcrypt from 'bcrypt';
import {
  uploadAvatar,
  uploadVideo,
  uploadCertificate,
} from '../utils/upload-file';

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
    await TeacherPersonalInfoModel.deleteOne({
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
      '_id name surname email role phone about avatar video'
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
      video: teacherModel.video,
      surname: teacherModel.surname,
      email: teacherModel.email,
      phone: teacherModel.phone,
      about: teacherModel.about,
      role: teacherModel.role,
      progress_account: teacherProgressAccount,
    };
  }

  async uploadUserAvatar(id: string, file: string) {
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

    if (progressData && progressData.photo.value === 0) {
      if (!response.avatar) return;
      await teacherProgressAccountService.addPhoto(id, response.avatar);
    }

    return {
      message: 'Teacher avatar update successfull!',
    };
  }

  async updateUserInfo(id: string, props: TeacherAccountEditableModelType) {
    const { video, ...baseProps } = props;
    let videoUrl: IVideo | null = null;

    if (video) {
      const res = await uploadVideo(video.tempFilePath);
      videoUrl = res as unknown as IVideo;
    }

    await TeacherModel.findOneAndUpdate(
      { _id: id },
      { video: videoUrl },
      { new: true }
    );

    const response = await TeacherModel.findOneAndUpdate(
      { _id: id },
      {
        ...baseProps,
      },
      { new: true }
    ).select('phone about avatar video');

    if (!response) throw ApiError.BadRequestError('Teacher did not update');

    await teacherProgressAccountService.updateAccountInfo(id, {
      phone: response.phone,
      about: response.about,
      video: response.video,
    });

    return {
      message: 'Teacher info update successfull!',
    };
  }

  async addMainFieldsActivity(id: string, props: ITeacherMainFieldsActivity) {
    const response = await TeacherPersonalInfoModel.findOneAndUpdate(
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
    const response = await TeacherPersonalInfoModel.findOneAndUpdate(
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
    const response = await TeacherPersonalInfoModel.findOne({ teacherId: id });
    if (response) {
      await TeacherPersonalInfoModel.findOneAndUpdate(
        { teacherId: id },
        {
          personal_lessons: {
            ...props,
          },
        },
        { new: true }
      );
    } else {
      const teacherPersonalInfoResponse = await new TeacherPersonalInfoModel({
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
    const response = await TeacherPersonalInfoModel.findOneAndUpdate(
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
    const response = await TeacherPersonalInfoModel.findOneAndUpdate(
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
    const response = await TeacherPersonalInfoModel.findOne({
      teacherId: id,
    }).select(
      '_id teacherId fields_activity personal_lessons work_experience certificates'
    );

    if (!response) {
      throw ApiError.BadRequestError(`Teacher with id ${id} not a found!`);
    }

    return response;
  }

  async uploadCertificate(id: string, props: ITeacherCertificate) {
    let imageUrl = '';
    if (props.image) {
      const res = await uploadCertificate(props.image);
      imageUrl = res.secure_url;
    }

    const response = await TeacherPersonalInfoModel.findOne({ teacherId: id });

    if (!response)
      throw ApiError.BadRequestError('Teacher certificate did not upload');

    await TeacherPersonalInfoModel.findOneAndUpdate(
      { teacherId: id },
      { $push: { certificates: { ...props, image: imageUrl } } },
      { new: true }
    );

    const progressData = await TeacherProgressAccountModel.findOne({
      teacherId: id,
    });

    if (!response) return;

    if (progressData && progressData.certificate.value === 0) {
      await teacherProgressAccountService.addCertificate(id);
    }

    return {
      message: 'Teacher avatar update successfull!',
    };
  }

  async removeCertificate(id: string, certificateId: string) {
    const response = await TeacherPersonalInfoModel.findOneAndUpdate(
      { teacherId: id },
      { $pull: { certificates: { _id: certificateId } } },
      { new: true }
    );

    if (response && response.certificates.length === 0) {
      await teacherProgressAccountService.removeCertificate(id);
    }

    return {
      message: 'Teacher certificate remove successfull!',
    };
  }
}

export default new TeacherService();
