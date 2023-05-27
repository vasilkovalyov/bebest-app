import { IRegistrationStrategy } from './registration';
import TeacherModel from '../../models/teacher.model';
import UserModel from '../../models/user.model';
import ApiError from '../../utils/api-error';
import bcrypt from 'bcrypt';

import { IRegistrationResponse } from '../../interfaces/response';

export interface ITeacherRegistrationProps {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirm_password: string;
}

class TeacherRegistration implements IRegistrationStrategy {
  private props: ITeacherRegistrationProps;

  constructor(props: ITeacherRegistrationProps) {
    this.props = props;
  }

  async registration(successMessage): Promise<IRegistrationResponse> {
    const { email, password } = this.props;
    const userExist = await TeacherModel.findOne({ email: email });

    if (userExist)
      throw ApiError.BadRequestError(
        `Teacher with email - ${email} alreary exist!`
      );

    const hashedPassword = await bcrypt.hash(password, 10);

    const teacher = await new TeacherModel({
      name: this.props.name,
      surname: this.props.surname,
      email: email,
      password: hashedPassword,
      role: 'teacher',
    });
    const savedTeacher = await teacher.save();

    const user = await new UserModel({
      userId: savedTeacher._id,
      email: savedTeacher.email,
      role: savedTeacher.role,
    });

    await user.save();

    return {
      message: successMessage,
    };
  }
}

export default TeacherRegistration;
