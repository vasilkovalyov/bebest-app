import $api from '@/utils/ajax'
import { AxiosResponse } from 'axios'
import { PRIVATE_REQUESTS } from '@/constants/api-requests'
import { PUBLIC_REQUESTS } from '@/constants/api-requests'
import { IRegistrationResponse } from '@/interfaces/common'
import { IRegistrationStudent } from '../components/Forms/Registration/RegistrationStudent/RegistrationStudent.type'
import { IAuthUserInfo } from '@/redux/slices/auth'

export type UserAccountInfoEditType = Omit<
  IAuthUserInfo,
  'role' | '_id' | 'avatar'
>

class StudentService {
  constructor() {}

  async getUserInfo(
    token?: string | undefined
  ): Promise<AxiosResponse<IAuthUserInfo>> {
    const response = await $api(token).get(
      `/${PRIVATE_REQUESTS.USER_INFO}/student`
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

  async deleteUser(): Promise<AxiosResponse<{ data: boolean }>> {
    const response = await $api().delete(
      `/${PRIVATE_REQUESTS.USER_DELETE}/student`
    )

    return response
  }

  async updateUserAccountInfo(
    props: UserAccountInfoEditType
  ): Promise<AxiosResponse<IAuthUserInfo>> {
    const response = await $api().post(
      `/${PRIVATE_REQUESTS.USER_INFO}/student`,
      {
        ...props,
      }
    )

    return response
  }

  async changePassword(
    password: string
  ): Promise<AxiosResponse<{ message: string }>> {
    const response = await $api().post(
      `/${PRIVATE_REQUESTS.UPDATE_PASSWORD}/student`,
      {
        password: password,
      }
    )

    return response
  }
}

const studentService = new StudentService()

export default studentService
