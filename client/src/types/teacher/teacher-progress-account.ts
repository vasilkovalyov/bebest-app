export interface ITeacherProgressAccount {
  about?: {
    value: number
    title: string
  }
  avatar?: {
    value: number
    title: string
  }
  phone?: {
    value: number
    title: string
  }
  payment_card?: {
    value: number
    title: string
  }
  certificate?: {
    value: number
    title: string
  }
  experience?: {
    value: number
    title: string
  }
  trial_lessons?: {
    value: number
    title: string
  }
  personal_lessons?: {
    value: number
    title: string
  }
  fullname: {
    value: number
    title: string
  }
  subjects?: {
    value: number
    title: string
  }
  video?: {
    value: number
    title: string
  }
  profile_progress: number
  total_checked_count: number
}
