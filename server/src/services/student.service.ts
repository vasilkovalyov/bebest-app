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
      throw ApiError.BadRequestError(`User with email ${id} not a found!`);

    const studentUser = await StudentModel.deleteOne({
      _id: id,
    });

    if (!studentUser)
      throw ApiError.BadRequestError(`Student with email ${id} not a found!`);

    return true;
  }
}

export default new StudentService();
