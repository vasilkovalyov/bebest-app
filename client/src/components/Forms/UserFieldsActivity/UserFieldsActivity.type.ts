import { IFieldActivity } from '@/types/common'
import { ISubjectCategory } from '@/types/subjects'

export interface IUserFieldsActivityInfo {
  fields_activity: IFieldActivity[] | []
}

export interface IUserFieldsActivityFormProps {
  onHandleClose: () => void
}

export interface ISkillsChecked {
  subjects: ISubjectCategory[]
}

export interface ISubjectsActivities {
  subjects: ISubjectCategory[]
}
