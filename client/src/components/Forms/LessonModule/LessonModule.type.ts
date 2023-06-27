import { FormMode } from '@/types/common'
import { ITeacherLessonModuleEditableProps } from '@/types/teacher/teacher-lesson-module'

export interface ILessonModuleProps {
  initialData?: ITeacherLessonModuleEditableProps | null
  isLoading?: boolean
  mode: FormMode
  onSubmit: (props: ITeacherLessonModuleEditableProps) => void
}
