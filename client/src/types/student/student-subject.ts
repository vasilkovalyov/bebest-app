export interface IStudentSubject {
  _id?: string
  subject_study: string
  level_mastery_subject: string
}

export interface IStudentSubjects {
  subjects: IStudentSubject[]
}
