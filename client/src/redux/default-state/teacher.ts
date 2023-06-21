import { defaultProgressAccountState } from './teacher-progress-account'
import { ITeacher } from '@/types/teacher/teacher'

export const defaultTeacherState: ITeacher = {
  _id: '',
  name: '',
  surname: '',
  email: '',
  phone: null,
  about: null,
  role: null,
  avatar: null,
  video: null,
  progress_account: defaultProgressAccountState,
  activated: false,
}
