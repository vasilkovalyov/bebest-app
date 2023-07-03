import { FormMode } from '@/types/common'
import { TeacherLessonModuleUpdateType } from '@/types/teacher/teacher-lesson-module'

export interface ILessonModuleProps {
  initialData?: TeacherLessonModuleUpdateType | null
  isLoading?: boolean
  mode: FormMode
  onSubmit: (props: TeacherLessonModuleUpdateType) => void
}
