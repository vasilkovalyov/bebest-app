import {
  ITeacherLessonModule,
  TeacherLessonModuleUpdateType,
} from '@/types/teacher/teacher-lesson-module'

export interface ILessonModulesProps {
  items: ITeacherLessonModule[] | []
}
