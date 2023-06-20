import { PRIVATE_REQUESTS } from '@/constants/api-requests'
import { IWorkExperience } from '@/types/common'
import $api from '@/utils/ajax'
import { AxiosResponse } from 'axios'

class TeacherWorkExperienceService {
  async addWorkExperience(
    props: IWorkExperience
  ): Promise<AxiosResponse<{ message: string }>> {
    const response = await $api().post(
      `/${PRIVATE_REQUESTS.WORK_EXPERIENCE}/teacher`,
      {
        ...props,
      }
    )
    return response
  }

  async removeWorkExperience(
    id: string
  ): Promise<AxiosResponse<{ message: string }>> {
    const response = await $api().delete(
      `/${PRIVATE_REQUESTS.WORK_EXPERIENCE}/teacher/${id}`
    )
    return response
  }
}

const teacherWorkExperienceService = new TeacherWorkExperienceService()

export default teacherWorkExperienceService
