import ApiError from '../utils/api-error';
import StudentModel, { StudentModelType } from '../models/student.model';
import UserModel, { UserModelType } from '../models/user.model';
import bcrypt from 'bcrypt';

class StudentService {
  async addUser() {
    try {
      const hashedPassword = await bcrypt.hash('19940926', 10);
      const student: StudentModelType = await new StudentModel({
        name: 'Vasiliy',
        surname: 'Kovalyov',
        role: 'student',
        email: 'vasilkovalyov@gmail.com',
        password: hashedPassword,
      });
      const savedStudent = await student.save();

      const user: UserModelType = await new UserModel({
        userId: savedStudent._id,
        email: savedStudent.email,
        password: savedStudent.password,
        role: savedStudent.role,
      });

      const savedUser = await user.save();

      return savedStudent;
    } catch (e: any) {
      throw Error(e.message);
    }
  }

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
    const studentModel = await StudentModel.findByIdAndUpdate(
      { _id: id },
      {
        password: password,
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
