import { IStudentSubject } from '@/services/student-subjects'

export interface IStudentEducationInfo {
  subjects: IStudentSubject[] | []
}

export interface IAccountStudentFormProps {
  initialData?: IStudentEducationInfo
  onHandleClose: () => void
  onHandleUpdate: () => void
}
