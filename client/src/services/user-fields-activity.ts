import { TEACHER_REQUESTS } from '@/constants/api-requests'
import $api from '@/utils/ajax'
import { AxiosResponse } from 'axios'
import { UserRole } from '@/types/role'
import { IFieldActivityRequest } from '@/types/common'

class UserFieldsActivityService {
  async createMainFieldsActivity(
    props: IFieldActivityRequest,
    role: UserRole
  ): Promise<AxiosResponse<{ message: string }>> {
    const response = await $api().post(
      TEACHER_REQUESTS.CREATE_MAIN_FIELD_ACTIVITY,
      {
        ...props,
      }
    )
    return response
  }

  async deleteMainFieldsActivity(
    id: string,
    role: UserRole
  ): Promise<AxiosResponse<{ message: string }>> {
    const response = await $api().delete(
      `${TEACHER_REQUESTS.DELETE_MAIN_FIELD_ACTIVITY}/${id}`
    )

    return response
  }
}

const userFieldsActivityService = new UserFieldsActivityService()

export default userFieldsActivityService
