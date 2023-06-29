import { Schema, model } from 'mongoose';
import { IUser } from '../user.model';

export interface ICompany extends IUser {
  company_name: string;
  admin_name: string;
  admin_surname: string;
  password: string;
  phone?: string | null;
  about?: string | null;
  avatar?: string;
}

export type ICompanyUpdateAccountType = Omit<
  ICompany,
  'password' | 'userId' | 'role'
>;

const CompanySchema = new Schema<ICompany>({
  company_name: { type: String, required: true },
  admin_name: { type: String, required: true },
  admin_surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: false, default: null },
  about: { type: String, required: false, default: null },
  avatar: {
    type: String,
    default: null,
  },
  role: {
    type: String,
    enum: ['student', 'teacher', 'company'],
    required: true,
  },
});

const Company = model('Company', CompanySchema);

export default Company;
