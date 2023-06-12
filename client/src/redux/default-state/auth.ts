import { ITeacherProgressAccount } from '@/models/teacher/teacher-progress-account'
import { IAuthUserInfo } from '../slices/auth'

export const defaultProgressAccountState: ITeacherProgressAccount = {
  fullname: {
    value: 0,
    title: '',
  },
  about: {
    value: 0,
    title: '',
  },
  payment_card: {
    value: 0,
    title: '',
  },
  certificate: {
    value: 0,
    title: '',
  },
  experience: {
    value: 0,
    title: '',
  },
  personal_lessons: {
    value: 0,
    title: '',
  },
  phone: {
    value: 0,
    title: '',
  },
  avatar: {
    value: 0,
    title: '',
  },
  subjects: {
    value: 0,
    title: '',
  },
  trial_lessons: {
    value: 0,
    title: '',
  },
  video: {
    value: 0,
    title: '',
  },
  profile_progress: 0,
  total_checked_count: 0,
}

export const defaultAuthState: IAuthUserInfo = {
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
}
