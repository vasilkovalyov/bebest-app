import { IFieldActivity } from '@/types/common'
import { ISubjectSkill } from '@/types/subjects'

export interface IUserFieldsActivityInfo {
  fields_activity: IFieldActivity[] | []
}

export interface IUserFieldsActivityFormProps {
  onHandleClose: () => void
}

export interface ISkillsChecked {
  subjects: ISubjectSkill[]
}

export interface ISubjectsActivities {
  subjects: ISubjectSkill[]
}
