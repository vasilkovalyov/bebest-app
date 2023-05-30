import { PRIVATE_REQUESTS } from '@/constants/api-requests'
import $api from '@/utils/ajax'
import { AxiosResponse } from 'axios'

export interface IFieldActivity {
  _id?: string
  activity: string
  skills: string
}
