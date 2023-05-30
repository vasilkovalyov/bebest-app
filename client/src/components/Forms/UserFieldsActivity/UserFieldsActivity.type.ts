import { IUserFieldActivity } from '@/services/user-fields-activity'

export interface IUserFieldsActivityInfo {
  fields_activity: IUserFieldActivity[]
}

export interface IUserFieldsActivityFormProps {
  initialData?: IUserFieldsActivityInfo
  onHandleClose: () => void
  onHandleUpdate: () => void
}
