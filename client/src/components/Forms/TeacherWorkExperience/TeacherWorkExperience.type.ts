import { IWorkExperience } from '@/types/common'

export interface ITeacherWorkExperienceInfo {
  work_experience: IWorkExperience[] | []
}

export interface ITeacherWorkExperienceFormProps {
  onHandleClose: () => void
}
