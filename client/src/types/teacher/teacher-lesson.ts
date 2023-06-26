import { LessonType } from '../lessons'
import { ISubject } from '../subjects'

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
}

export interface ITeacherLessonEditableProps
  extends Omit<ITeacherLesson, 'type' | '_id'> {}

export interface ITeacherLessonExtended
  extends Omit<ITeacherLesson, 'subject'> {
  registeredCount?: number
  subject: Omit<ISubject, 'categories'>
}
