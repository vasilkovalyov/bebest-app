export interface IStudentEducation {
  _id?: string
  subject_study: string
  level_mastery_subject: string
}

export interface IStudentEducationInfo {
  subjects: IStudentEducation[] | []
}

export interface IAccountStudentFormProps {
  initialData?: IStudentEducationInfo
  onHandleClose: () => void
}
