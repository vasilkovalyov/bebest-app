import { ICostPersonalLesson, IFieldActivity, IVideo } from '../common'
import { UserRole } from '../role'
import { ITeacherPersonalInfo } from './teacher-personal-info'
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

export interface ITeacherPreviewInfo
  extends Pick<
    ITeacher,
    '_id' | 'about' | 'name' | 'surname' | 'avatar' | 'video'
  > {
  personalInfoId: {
    fields_activity: IFieldActivity[]
    personal_lessons: ICostPersonalLesson
  }
}

export interface ITeacherFullInfo extends ITeacher {
  personalInfoId: ITeacherPersonalInfo
}
