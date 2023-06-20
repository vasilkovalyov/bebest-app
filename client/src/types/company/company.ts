import { UserRole } from '../role'

export interface ICompanyRegistration {
  company_name: string
  admin_name: string
  admin_surname: string
  email: string
  password: string
  confirm_password: string
}

export interface ICompany
  extends Omit<ICompanyRegistration, 'password' | 'confirm_password'> {
  _id: string
  role: UserRole | null
  avatar?: string | null
  phone?: string | null
  about?: string | null
}

export type IStudentAccountEditProps = Pick<
  ICompany,
  'company_name' | 'admin_name' | 'admin_surname' | 'about'
>

export type ICompanyAccountFormFields = Pick<
  ICompany,
  'company_name' | 'admin_name' | 'admin_surname' | 'about' | 'phone'
>
