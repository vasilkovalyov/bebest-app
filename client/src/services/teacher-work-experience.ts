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

class TeacherWorkExperienceService {
  async addWorkExperience(
    props: ITeacherWorkExperience
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
