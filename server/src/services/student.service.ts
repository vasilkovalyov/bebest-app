import ApiError from '../utils/api-error';
import StudentModel from '../models/student.model';
import UserModel from '../models/user.model';
import bcrypt from 'bcrypt';

class StudentService {
  async removeUser(id: string) {
    const user = await UserModel.deleteOne({
      userId: id,
    });

    if (!user)
      throw ApiError.BadRequestError(`User with id ${id} not a found!`);

    const studentUser = await StudentModel.deleteOne({
      _id: id,
    });

    if (!studentUser)
      throw ApiError.BadRequestError(`Student with id ${id} not a found!`);

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
      throw ApiError.BadRequestError(`Student with id ${id} not a found!`);

    return {
      message: 'Password has been update successfully!',
    };
  }

  async getUserInfo(id: string) {
    const studentModel = await StudentModel.findOne({ _id: id }).select(
      '_id name surname email role phone about'
    );

    if (!studentModel) {
      throw ApiError.BadRequestError(`Student with id ${id} not a found!`);
    }

    return studentModel;
  }
}

export default new StudentService();
