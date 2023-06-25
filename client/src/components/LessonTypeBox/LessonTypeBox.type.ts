import { LessonType } from '@/types/lessons'

export interface ILessonTypeBoxProps {
  title: string
  text: string
  type: LessonType
  onClick: (type: LessonType) => void
  className?: string | null
}
