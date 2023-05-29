import { ITeacherWorkExperience } from '@/services/teacher-work-experience'

export interface ITeacherWorkExperienceInfo {
  work_experience: ITeacherWorkExperience[] | []
}

export interface ITeacherWorkExperienceFormProps {
  initialData?: ITeacherWorkExperienceInfo
  onHandleClose: () => void
  onHandleUpdate: () => void
}
