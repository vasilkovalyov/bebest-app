import { ITeacherPersonalInfoState } from '../slices/teacher-personal-info'

export const defaultTeacherPersonalInfoState: ITeacherPersonalInfoState = {
  fields_activity: [],
  personal_lessons: null,
  work_experience: [],
  certificates: [],
  loading: true,
  error: null,
}
