import { FormMode } from '@/types/common'
import { LessonType } from '@/types/lessons'
import { ITeacherLessonEditableProps } from '@/types/teacher/teacher-lesson'

export interface ILessonFormProps {
  initialData?: ITeacherLessonEditableProps
  isLoading?: boolean
  lessonType: LessonType
  mode: FormMode
  onSubmit: (props: ITeacherLessonEditableProps) => void
}
