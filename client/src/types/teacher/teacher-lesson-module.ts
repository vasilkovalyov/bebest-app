export interface ITeacherLessonModule {
  _id?: string
  topic: string
  rich_text: string
  start_date: string
  time_start: string
  duration_time: string
}

export interface TeacherLessonModuleUpdateType
  extends Omit<ITeacherLessonModule, '_id'> {}
