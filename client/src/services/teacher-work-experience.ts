import { PRIVATE_REQUESTS } from '@/constants/api-requests'
import $api from '@/utils/ajax'
import { AxiosResponse } from 'axios'

export interface ITeacherWorkExperience {
  _id?: string
  company_name: string
  description: string | null
  startDate: string
  endDate: string | null
  isStillWorking: boolean
}
