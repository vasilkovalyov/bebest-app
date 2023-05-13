import $api from '@/utils/ajax'
import { AxiosResponse } from 'axios'
import { UserRole } from '@/types/role'
import { PRIVATE_REQUESTS } from '@/constants/api-requests'
import { PUBLIC_REQUESTS } from '@/constants/api-requests'
import { IRegistrationResponse } from '@/interfaces/common'
import { IRegistrationStudent } from '../components/Forms/Registration/RegistrationStudent/RegistrationStudent.type'

export interface IAuthUserInfo {
  _id: string
  name: string
  surname: string
  email: string
  phone: string | null
  about: string | null
  role: UserRole
}

export type UserAccountInfoEditType = Omit<IAuthUserInfo, 'role' | '_id'>

class StudentService {
  constructor() {}

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

  async registrationStudent(
    props: IRegistrationStudent
  ): Promise<AxiosResponse<IRegistrationResponse>> {
    const response = await $api().post(
      `/${PUBLIC_REQUESTS.REGISTRATION_STUDENT}`,
      {
        ...props,
        role: 'student',
      }
    )

    return response
  }

  async deleteUser(id: string): Promise<AxiosResponse<{ data: boolean }>> {
    const response = await $api().delete(
      `/${PRIVATE_REQUESTS.USER_DELETE}/student/${id}`
    )

    return response
  }

  async updateUserAccountInfo(id: string, props: UserAccountInfoEditType) {
    const response = await $api().post(
      `/${PRIVATE_REQUESTS.USER_INFO}/student`,
      {
        _id: id,
        ...props,
      }
    )

    return response
  }

  async changePassword(
    id: string,
    password: string
  ): Promise<AxiosResponse<{ message: string }>> {
    const response = await $api().post(
      `/${PRIVATE_REQUESTS.UPDATE_PASSWORD}/student`,
      {
        _id: id,
        password: password,
      }
    )

    return response
  }
}

const studentService = new StudentService()

export default studentService
