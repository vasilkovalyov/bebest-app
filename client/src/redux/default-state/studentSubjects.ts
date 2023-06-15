import { IStudentSubjectsState } from '../slices/student-subjects'

export const defaultStudentSubjects: IStudentSubjectsState = {
  subjects: [],
  loading: true,
  error: null,
}
