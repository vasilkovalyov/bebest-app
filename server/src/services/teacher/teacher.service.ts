import ApiError from '../../utils/api-error';
import TeacherModel, {
  ITeacher,
  ITeacherAccountEditableProps,
} from '../../models/teacher/teacher.model';
import UserModel from '../../models/user.model';
import TeacherPersonalInfoModel from '../../models/teacher/teacher-personal-info';
import TeacherProgressAccountModel from '../../models/teacher/teacher-progress-account';
import TeacherPaymentCardModel from '../../models/teacher/teacher-payment-card';

import teacherProgressAccountService from './teacher-progress-account';
import bcrypt from 'bcrypt';
import { uploadAvatar, uploadVideo } from '../../utils/upload-file';
import responseMessages, {
  userWithIdNotFound,
} from '../../constants/responseMessages';
import { IVideo } from '../../interfaces/common';

class TeacherService {
  async removeUser(id: string) {
    const user = await UserModel.deleteOne({
      userId: id,
    });

    if (!user.deletedCount)
      throw ApiError.BadRequestError(userWithIdNotFound('user', id));

    await TeacherModel.deleteOne({
      _id: id,
    });
    await TeacherPersonalInfoModel.deleteOne({
      teacherId: id,
    });
    await TeacherProgressAccountModel.deleteOne({
      teacherId: id,
    });
    await TeacherPaymentCardModel.deleteOne({
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
      throw ApiError.BadRequestError(userWithIdNotFound('teacher', id));

    return {
      message: responseMessages.passwordUpdateSuccessful,
    };
  }

  async getUserInfo(id: string) {
    const teacherModel = await TeacherModel.findOne({ _id: id }).select(
      '_id name surname email role phone about avatar video activated'
    );

    if (!teacherModel) {
      throw ApiError.BadRequestError(userWithIdNotFound('teacher', id));
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
      activated: teacherModel.activated,
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
      throw ApiError.BadRequestError(responseMessages.avatarDidNotUpdate);

    const progressData = await TeacherProgressAccountModel.findOne({
      teacherId: id,
    });

    if (progressData && progressData.photo.value === 0) {
      if (!response.avatar) return;
      await teacherProgressAccountService.addPhoto(id, response.avatar);
    }

    await this.activateUser(id);

    return {
      message: responseMessages.avatarUpdateSuccessful,
    };
  }

  async updateUserInfo(id: string, props: ITeacherAccountEditableProps) {
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

    await this.activateUser(id);

    if (!response)
      throw ApiError.BadRequestError(responseMessages.userInfoDidNotUpdate);

    await teacherProgressAccountService.updateAccountInfo(id, {
      phone: response.phone,
      about: response.about,
      video: response.video,
    });

    return {
      message: responseMessages.userInfoUpdateSuccessful,
    };
  }

  async activateUser(id: string) {
    const isActivated = await teacherProgressAccountService.isFillForActivate(
      id
    );
    await TeacherModel.findByIdAndUpdate(
      { _id: id },
      {
        activated: isActivated,
      },
      { new: true }
    );
  }

  async getUsers() {
    const teachers = await TeacherModel.find({ activated: true }).populate(
      'personalInfoId'
    );
    return teachers;
  }

  async getUserProfile(id: string) {
    const teachers = await TeacherModel.findOne({ _id: id }).populate(
      'personalInfoId'
    );
    return teachers;
  }
}

export default new TeacherService();
