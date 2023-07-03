import { LessonType } from '../lessons'
import { SubjectShortType } from '../subjects'
import { ITeacherLessonModule } from './teacher-lesson-module'

export interface ITeacherLesson {
  _id?: string
  topic: string
  subject: string
  description: string
  start_date: string
  time_start: string
  duration_months?: number | string
  duration_time?: string
  max_users: number | string
  price?: number | string
  is_free?: boolean
  type: LessonType
  modules?: string[] | null
}

export type TeacherLessonCreateType = Omit<
  ITeacherLesson,
  '_id' | 'type' | 'modules'
>

export type TeacherLessonUpdateType = Omit<
  TeacherLessonCreateType,
  'subject'
> & {
  type: LessonType
  subject: SubjectShortType
}

export type TeacherLessonFullInfoType = Omit<
  ITeacherLesson,
  'subject' | 'modules'
> & {
  subject: SubjectShortType
  modules?: ITeacherLessonModule[] | null
  registeredCount?: number
}
