import ApiError from '../utils/api-error';
import StudentModel from '../models/student.model';
import TeacherModel from '../models/teacher.model';
import UserModel from '../models/user.model';
import bcrypt from 'bcrypt';
import { ILoginResponse } from '../interfaces/response';
import TokenService from './token.service';
import responseMessages from '../constants/responseMessages';
import { userWithEmailNotFound } from '../constants/responseMessages';

class LoginService {
  static async login(
    email: string,
    password: string
  ): Promise<ILoginResponse | void> {
    const user = await UserModel.findOne({
      email: email,
    });

    if (!user)
      throw ApiError.BadRequestError(userWithEmailNotFound('User', email));

    if (user.role === 'student') {
      const studentModel = await StudentModel.findOne({
        _id: user.userId,
      });

      if (!studentModel)
        throw ApiError.BadRequestError(userWithEmailNotFound('student', email));

      const validPass = await bcrypt.compare(password, studentModel.password);
      if (!validPass)
        throw ApiError.BadRequestError(responseMessages.wrongPassword);

      const token = await TokenService.generateTokens({
        _id: studentModel._id,
        role: studentModel.role,
      });

      return {
        userId: studentModel._id,
        role: studentModel.role,
        token: token.accessToken,
      };
    }
    if (user.role === 'teacher') {
      const teacherModel = await TeacherModel.findOne({
        _id: user.userId,
      });

      if (!teacherModel)
        throw ApiError.BadRequestError(userWithEmailNotFound('teacher', email));

      const validPass = await bcrypt.compare(password, teacherModel.password);
      if (!validPass)
        throw ApiError.BadRequestError(responseMessages.wrongPassword);

      const token = await TokenService.generateTokens({
        _id: teacherModel._id,
        role: teacherModel.role,
      });

      return {
        userId: teacherModel._id,
        role: teacherModel.role,
        token: token.accessToken,
      };
    }
  }
}

export default LoginService;
