import { TeacherLessonFullInfoType } from '@/types/teacher/teacher-lesson'
import { ReactNode } from 'react'

export interface ITeacherLessonCardProps extends TeacherLessonFullInfoType {
  className?: string
  actionEdit?: ReactNode
}
