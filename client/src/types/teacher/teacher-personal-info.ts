import {
  ICostPersonalLesson,
  IFieldActivity,
  IWorkExperience,
  IСertificate,
} from '@/types/common'

export interface ITeacherPersonalInfo {
  fields_activity: IFieldActivity[]
  work_experience: IWorkExperience[]
  personal_lessons: ICostPersonalLesson | null
  certificates: IСertificate[] | []
}
