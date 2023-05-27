import ApiError from '../utils/api-error';
import TeacherModel, {
  TeacherAccountEditableModelType,
} from '../models/teacher.model';
import UserModel from '../models/user.model';
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
}

export default new TeacherService();
