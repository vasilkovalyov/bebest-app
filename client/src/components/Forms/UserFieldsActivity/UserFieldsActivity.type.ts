import { ISubjectSkill } from '@/services/subjects'
import { IUserFieldActivity } from '@/services/user-fields-activity'

export interface IUserFieldsActivityInfo {
  fields_activity: IUserFieldActivity[] | []
}

export interface IUserFieldsActivityFormProps {
  initialData?: IUserFieldsActivityInfo
  onHandleClose: () => void
  onHandleUpdate: () => void
}

export interface ISkillsChecked {
  subjects: string[]
}

export interface ISubjects {
  subjects: ISubjectSkill[]
}
