import { UserRole } from '../role'

export interface IStudentRegistration {
  name: string
  surname: string
  email: string
  password: string
  confirm_password: string
}

export interface IStudent
  extends Omit<IStudentRegistration, 'password' | 'confirm_password'> {
  _id: string
  role: UserRole | null
  avatar?: string | null
  phone?: string | null
  about?: string | null
}

export type StudentAccountUpdateType = Pick<
  IStudent,
  'name' | 'surname' | 'phone' | 'about' | 'email'
>

export type StudentLessonShortInfoType = Pick<
  IStudent,
  '_id' | 'name' | 'surname' | 'avatar'
>
