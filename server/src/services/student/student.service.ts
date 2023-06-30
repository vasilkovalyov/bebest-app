import ApiError from '../../utils/api-error';
import StudentModel, {
  StudentUpdateAccountType,
} from '../../models/student/student.model';
import UserModel from '../../models/user.model';
import bcrypt from 'bcrypt';
import { uploadAvatar } from '../../utils/upload-file';
import responseMessages, {
  userWithIdNotFound,
} from '../../constants/responseMessages';

class StudentService {
  async getUsers() {
    const studentUser = await StudentModel.find({}).select(
      '_id name surname email avatar'
    );
    return studentUser;
  }

  async deleteAccount(id: string) {
    const user = await UserModel.deleteOne({
      userId: id,
    });

    if (!user) throw ApiError.BadRequestError(userWithIdNotFound('user', id));

    const studentUser = await StudentModel.deleteOne({
      _id: id,
    });

    if (!studentUser)
      throw ApiError.BadRequestError(userWithIdNotFound('student', id));

    return true;
  }

  async changePassword(id: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const studentModel = await StudentModel.findByIdAndUpdate(
      { _id: id },
      {
        password: hashedPassword,
      },
      {
        new: true,
      }
    );

    if (!studentModel)
      throw ApiError.BadRequestError(userWithIdNotFound('student', id));

    return {
      message: responseMessages.passwordUpdateSuccessful,
    };
  }

  async getAccountInfo(id: string) {
    const studentModel = await StudentModel.findOne({ _id: id }).select(
      '_id name surname email role phone about avatar'
    );

    if (!studentModel) {
      throw ApiError.BadRequestError(userWithIdNotFound('student', id));
    }

    return studentModel;
  }

  async uploadAvatar(id: string, file: string) {
    let avatarImage = '';
    if (file) {
      const res = await uploadAvatar(file);
      avatarImage = res.secure_url;
    }

    const response = await StudentModel.findOneAndUpdate(
      { _id: id },
      {
        avatar: avatarImage,
      },
      { new: true }
    );

    if (!response)
      throw ApiError.BadRequestError(responseMessages.avatarDidNotUpdate);

    return {
      message: responseMessages.avatarUpdateSuccessful,
    };
  }

  async updateAccountInfo(id: string, props: StudentUpdateAccountType) {
    let avatarImage = '';
    if (props.avatar || props.avatar === null) {
      const res = await uploadAvatar(props.avatar);
      avatarImage = res.secure_url;
    }

    const response = await StudentModel.findOneAndUpdate(
      { _id: id },
      {
        ...props,
        avatar: avatarImage,
      },
      { new: true }
    );

    if (!response)
      throw ApiError.BadRequestError(responseMessages.userInfoDidNotUpdate);

    return {
      message: responseMessages.userInfoUpdateSuccessful,
    };
  }
}

export default new StudentService();
