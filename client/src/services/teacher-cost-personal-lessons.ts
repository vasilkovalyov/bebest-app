import { PRIVATE_REQUESTS } from '@/constants/api-requests'
import $api from '@/utils/ajax'
import { AxiosResponse } from 'axios'

export type UseTrialLessonType = 'true' | 'false'

export interface ITeacherCostPersonalLesson {
  duration: string
  price: string
  is_free: boolean
  trial_duration: string
  trial_price: string
  is_trial_free: boolean
  use_trial: UseTrialLessonType
}

class TeacherCostPersonalLessonsService {
  async updatePersonalLessonsInfo(
    props: ITeacherCostPersonalLesson
  ): Promise<AxiosResponse<{ message: string }>> {
    const response = await $api().post(
      `/${PRIVATE_REQUESTS.PERSONAL_LESSONS_TEACHER}`,
      {
        ...props,
      }
    )
    return response
  }
}

const teacherCostPersonalLessonsService =
  new TeacherCostPersonalLessonsService()

export default teacherCostPersonalLessonsService
