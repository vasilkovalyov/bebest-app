import { LessonType } from '../lessons'
import { ISubject } from '../subjects'
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

export interface ITeacherLessonEditableProps
  extends Omit<ITeacherLesson, 'type' | '_id' | 'modules'> {}

export interface ITeacherLessonUpdateEditableProps
  extends Omit<ITeacherLessonEditableProps, 'subject'> {
  type: LessonType
  subject: Omit<ISubject, 'categories'>
}

export interface ITeacherLessonExtended
  extends Omit<ITeacherLesson, 'subject' | 'modules'> {
  registeredCount?: number
  subject: Omit<ISubject, 'categories'>
  modules?: ITeacherLessonModule[] | null
}

export interface ITeacherLessonUpdate
  extends Omit<ITeacherLessonExtended, 'modules' | 'registeredCount' | '_id'> {}
