import { PRIVATE_REQUESTS } from '@/constants/api-requests'
import $api from '@/utils/ajax'
import { AxiosResponse } from 'axios'

export interface ITeacherCostPersonalLesson {
  duration: string
  price: string
  is_free: boolean
  trial_duration: string
  trial_price: string
  is_trial_free: boolean
  use_trial: boolean
}
