import { ITeacherLessonModule } from '@/types/teacher/teacher-lesson-module'

export interface ITeacherTrainingPlanBlockProps {
  editType?: boolean
  items?: ITeacherLessonModule[]
}
