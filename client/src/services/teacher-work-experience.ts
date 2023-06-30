import { TEACHER_REQUESTS } from '@/constants/api-requests'
import { IWorkExperience } from '@/types/common'
import $api from '@/utils/ajax'
import { AxiosResponse } from 'axios'

class TeacherWorkExperienceService {
  async createWorkExperience(
    props: IWorkExperience
  ): Promise<AxiosResponse<{ message: string }>> {
    const response = await $api().post(
      TEACHER_REQUESTS.CREATE_WORK_EXPERIENCE,
      {
        ...props,
      }
    )
    return response
  }

  async deleteWorkExperience(
    id: string
  ): Promise<AxiosResponse<{ message: string }>> {
    const response = await $api().delete(
      `${TEACHER_REQUESTS.DELETE_WORK_EXPERIENCE}/${id}`
    )
    return response
  }
}

const teacherWorkExperienceService = new TeacherWorkExperienceService()

export default teacherWorkExperienceService
