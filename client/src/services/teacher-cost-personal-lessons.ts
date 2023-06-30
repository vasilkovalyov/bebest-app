import { TEACHER_REQUESTS } from '@/constants/api-requests'
import { ICostPersonalLesson } from '@/types/common'
import $api from '@/utils/ajax'
import { AxiosResponse } from 'axios'

export type UseTrialLessonType = 'true' | 'false'

class TeacherCostPersonalLessonsService {
  async updatePersonalLessonsInfo(
    props: ICostPersonalLesson
  ): Promise<AxiosResponse<{ message: string }>> {
    const response = await $api().post(
      TEACHER_REQUESTS.UPDATE_PERSONAL_LESSON,
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
