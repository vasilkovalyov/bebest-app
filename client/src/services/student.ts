import $api from '@/utils/ajax'
import { AxiosResponse } from 'axios'
import { UserRole } from '@/types/role'
import { PRIVATE_REQUESTS } from '@/constants/api-requests'

export interface IAuthUserInfo {
  _id: string
  name: string
  surname: string
  email: string
  phone: string | null
  about: string | null
  role: UserRole
}

class StudentService {
  async getUserInfo(
    role: UserRole,
    id: string,
    token?: string | undefined
  ): Promise<AxiosResponse<IAuthUserInfo>> {
    const response = await $api(token).get(
      `/${PRIVATE_REQUESTS.USER_INFO}/${role}`,
      {
        params: {
          id,
        },
      }
    )
    return response
  }
}

const studentService = new StudentService()

export default studentService
