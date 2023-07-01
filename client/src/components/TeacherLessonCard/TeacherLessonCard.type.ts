import { ITeacherLessonExtended } from '@/types/teacher/teacher-lesson'
import { ReactNode } from 'react'

export interface ITeacherLessonCardProps extends ITeacherLessonExtended {
  className?: string
  actionEdit?: ReactNode
}
