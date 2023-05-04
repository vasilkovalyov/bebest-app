import { IRegistrationStrategy } from './registration';
import StudentModel, {
  IStudent,
  StudentModelType,
} from '../../models/student.model';
import UserModel, { UserModelType } from '../../models/user.model';
import ApiError from '../../utils/api-error';
import bcrypt from 'bcrypt';

import { IRegistrationResponse } from '../../interfaces/response';

type RegistrationStudentType = Omit<IStudent, 'userId'>;

export interface IStudentRegistrationProps
  extends Omit<IStudent, 'phone' | 'about' | 'userId'> {
  confirm_password: string;
}

class StudentRegistration implements IRegistrationStrategy {
  private props: RegistrationStudentType;

  constructor(props: RegistrationStudentType) {
    this.props = props;
  }

  async registration(successMessage): Promise<IRegistrationResponse> {
    const { email, password } = this.props;
    const userExist = await StudentModel.findOne({ email: email });
    if (userExist)
      throw ApiError.BadRequestError(
        `Student with email - ${email} alreary exist!`
      );

    const hashedPassword = await bcrypt.hash(password, 10);

    const student: StudentModelType = await new StudentModel({
      name: this.props.name,
      surname: this.props.surname,
      email: email,
      password: hashedPassword,
      role: this.props.role,
    });
    const savedStudent = await student.save();

    const user: UserModelType = await new UserModel({
      userId: savedStudent._id,
      email: savedStudent.email,
      password: savedStudent.password,
      role: savedStudent.role,
    });

    const savedUser = await user.save();

    return {
      data: {
        _id: savedUser._id,
        email: savedUser.email,
        role: savedUser.role,
      },
      message: successMessage,
      status: 200,
    };
  }
}

export default StudentRegistration;
