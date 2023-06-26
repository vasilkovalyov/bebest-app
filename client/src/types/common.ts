import { ISubjectCategory } from './subjects'

export interface IVideo {
  width: number
  height: number
  format: string
  resource_type: string
  bytes: number
  url: string
  secure_url: string
  playback_url: string
}

export interface IСertificate {
  _id?: string
  name: string
  date: string
  image: string | null
}

export type UseTrialLessonType = 'true' | 'false'

export interface ICostPersonalLesson {
  duration: string
  price: string
  is_free: boolean
  trial_duration: string
  trial_price: string
  is_trial_free: boolean
  use_trial: UseTrialLessonType
}

export interface IWorkExperience {
  _id?: string
  company_name: string
  description: string | null
  startDate: string
  endDate: string | null
  isStillWorking: boolean
}

export interface IFieldActivity {
  _id?: string
  subject: string
  categories: ISubjectCategory[]
}

export interface IFieldActivityRequest {
  subject: string
  categories: string[]
}

export type FormMode = 'create' | 'update'
