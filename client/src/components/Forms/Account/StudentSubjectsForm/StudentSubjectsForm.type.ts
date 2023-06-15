import { IStudentSubject } from '@/services/student-subjects'

export interface IStudentSubjects {
  subjects: IStudentSubject[] | []
}

export interface IStudentSubjectsFormProps {
  onHandleClose: () => void
}
