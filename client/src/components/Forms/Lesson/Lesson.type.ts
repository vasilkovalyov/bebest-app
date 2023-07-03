import { FormMode } from '@/types/common'
import { LessonType } from '@/types/lessons'
import { TeacherLessonCreateType } from '@/types/teacher/teacher-lesson'

export interface ILessonFormProps {
  initialData?: TeacherLessonCreateType
  isLoading?: boolean
  lessonType: LessonType
  mode: FormMode
  onSubmit: (props: TeacherLessonCreateType) => void
}
