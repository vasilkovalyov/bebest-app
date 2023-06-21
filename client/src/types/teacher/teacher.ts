import { IVideo } from '../common'
import { UserRole } from '../role'
import { ITeacherProgressAccount } from './teacher-progress-account'

export interface ITeacherRegistration {
  name: string
  surname: string
  email: string
  password: string
  confirm_password: string
}

export interface ITeacher
  extends Omit<ITeacherRegistration, 'password' | 'confirm_password'> {
  _id: string
  role: UserRole | null
  avatar?: string | null
  phone?: string | null
  about?: string | null
  video?: IVideo | null
  progress_account: ITeacherProgressAccount
  activated: boolean
}

export type IStudentAccountEditProps = Pick<
  ITeacher,
  'name' | 'surname' | 'phone' | 'about' | 'video'
>

export type ITeacherAccountFormFields = Pick<
  ITeacher,
  'name' | 'surname' | 'phone' | 'about' | 'email'
> & {
  video?: File | string | null
}
