import { IRegistrationStrategy } from './registration';
import CompanyModel from '../../models/company/company.model';
import UserModel from '../../models/user.model';
import ApiError from '../../utils/api-error';
import bcrypt from 'bcrypt';

import { IRegistrationResponse } from '../../interfaces/response';
import { userWithEmailExist } from '../../constants/responseMessages';

export interface ICompanyRegistrationProps {
  company_name: string;
  admin_name: string;
  admin_surname: string;
  email: string;
  password: string;
  confirm_password: string;
}

class CompanyRegistration implements IRegistrationStrategy {
  private props: ICompanyRegistrationProps;

  constructor(props: ICompanyRegistrationProps) {
    this.props = props;
  }

  async registration(successMessage): Promise<IRegistrationResponse> {
    const { email, password, admin_name, admin_surname, company_name } =
      this.props;
    const userExist = await CompanyModel.findOne({ email: email });

    if (userExist)
      throw ApiError.BadRequestError(userWithEmailExist('company', email));

    const hashedPassword = await bcrypt.hash(password, 10);

    const company = await new CompanyModel({
      company_name: company_name,
      admin_name: admin_name,
      admin_surname: admin_surname,
      email: email,
      password: hashedPassword,
      role: 'company',
    });
    const savedCompany = await company.save();

    const user = await new UserModel({
      userId: savedCompany._id,
      email: savedCompany.email,
      role: savedCompany.role,
    });

    await user.save();

    return {
      message: successMessage,
    };
  }
}

export default CompanyRegistration;
