export interface IStudentEducation {
  subject_study: string
  level_mastery_subject: string
}

export interface IStudentEducationInfo {
  subjects: IStudentEducation[] | []
}
