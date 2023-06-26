export interface ITeacherLessonModule {
  _id?: string
  topic: string
  rich_text: string
  start_date: string
  time_start: string
  duration_time: string
}

export interface ITeacherLessonModuleEditableProps
  extends Omit<ITeacherLessonModule, '_id'> {}

// export interface ITeacherLessonExtended
//   extends Omit<ITeacherLesson, 'subject'> {
//   registeredCount?: number
//   subject: Omit<ISubject, 'categories'>
// }
