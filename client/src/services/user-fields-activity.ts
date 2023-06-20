import { PRIVATE_REQUESTS } from '@/constants/api-requests'
import $api from '@/utils/ajax'
import { AxiosResponse } from 'axios'
import { UserRole } from '@/types/role'
import { IFieldActivityRequest } from '@/types/common'

class UserFieldsActivityService {
  async addMainFieldsActivity(
    props: IFieldActivityRequest,
    role: UserRole
  ): Promise<AxiosResponse<{ message: string }>> {
    const response = await $api().post(
      `/${PRIVATE_REQUESTS.MAIN_FIELDS_ACTIVITY}/${role}`,
      {
        ...props,
      }
    )
    return response
  }

  async removeMainFieldsActivity(
    id: string,
    role: UserRole
  ): Promise<AxiosResponse<{ message: string }>> {
    const response = await $api().delete(
      `/${PRIVATE_REQUESTS.MAIN_FIELDS_ACTIVITY}/${role}/${id}`
    )

    return response
  }
}

const userFieldsActivityService = new UserFieldsActivityService()

export default userFieldsActivityService
