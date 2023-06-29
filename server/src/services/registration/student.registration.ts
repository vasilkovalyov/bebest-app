import { IRegistrationStrategy } from './registration';
import StudentModel, { IStudent } from '../../models/student/student.model';
import UserModel from '../../models/user.model';
import ApiError from '../../utils/api-error';
import bcrypt from 'bcrypt';

import { IRegistrationResponse } from '../../interfaces/response';
import { userWithEmailExist } from '../../constants/responseMessages';

export type IRegistrationStudentProps = Omit<IStudent, 'userId'>;

export interface IStudentRegistrationProps
  extends Omit<IStudent, 'phone' | 'about' | 'userId'> {
  confirm_password: string;
}

class StudentRegistration implements IRegistrationStrategy {
  private props: IRegistrationStudentProps;

  constructor(props: IRegistrationStudentProps) {
    this.props = props;
  }

  async registration(successMessage): Promise<IRegistrationResponse> {
    const { email, password } = this.props;
    const userExist = await StudentModel.findOne({ email: email });
    if (userExist)
      throw ApiError.BadRequestError(userWithEmailExist('student', email));

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await new StudentModel({
      name: this.props.name,
      surname: this.props.surname,
      email: email,
      password: hashedPassword,
      role: this.props.role,
    });
    const savedStudent = await student.save();

    const user = await new UserModel({
      userId: savedStudent._id,
      email: savedStudent.email,
      role: savedStudent.role,
    });

    await user.save();

    return {
      message: successMessage,
    };
  }
}

export default StudentRegistration;
