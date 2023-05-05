import ApiError from '../utils/api-error';
import StudentModel, { StudentModelType } from '../models/student.model';
import UserModel, { UserModelType } from '../models/user.model';
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
      data: {
        status: 200,
        data: true,
        message: 'Password has been update successfully!',
      },
    };
  }
}

export default new StudentService();
