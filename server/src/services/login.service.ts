import ApiError from '../utils/api-error';
import StudentModel, { StudentModelType } from '../models/student.model';
import UserModel, { UserModelType } from '../models/user.model';
import bcrypt from 'bcrypt';
import { ILoginResponse } from '../interfaces/response';
import { UserRole } from '../types/role';
import TokenService from './token.service';

class LoginService {
  static async login(
    email: string,
    password: string
  ): Promise<ILoginResponse | void> {
    const user = await UserModel.findOne({
      email: email,
    });

    if (!user)
      throw ApiError.BadRequestError(`User with email ${email} not a found!`);

    if (user.role === 'student') {
      const studentModel = await StudentModel.findOne({
        _id: user.userId,
      });

      if (!studentModel)
        throw ApiError.BadRequestError(
          `Student with email ${email} not a found!`
        );

      const validPass = await bcrypt.compare(password, studentModel.password);
      if (!validPass) throw ApiError.BadRequestError(`Wrong password!`);

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
  }
}

export default LoginService;
