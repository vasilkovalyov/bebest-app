import { IFieldActivity } from '@/services/fields-activity'

export interface IFieldsActivityInfo {
  fields_activity: IFieldActivity[]
}

export interface IFieldsActivityFormProps {
  initialData?: IFieldsActivityInfo
  onHandleClose: () => void
  onHandleUpdate: () => void
}
