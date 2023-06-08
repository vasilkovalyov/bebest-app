import $api from '@/utils/ajax'
import { AxiosResponse } from 'axios'
import { UserRole } from '@/types/role'
import { PRIVATE_REQUESTS } from '@/constants/api-requests'
import { PUBLIC_REQUESTS } from '@/constants/api-requests'
import { IRegistrationResponse } from '@/interfaces/common'
import { IRegistrationTeacher } from '../components/Forms/Registration/RegistrationTeacher/RegistrationTeacher.type'
import { IAuthUserInfo } from '@/redux/slices/auth'

export type UserAccountInfoEditType = Omit<
  IAuthUserInfo,
  'role' | '_id' | 'progress_account' | 'video'
> & {
  video?: File | string | null
}

class TeacherService {
  constructor() {}

  async getUserInfo(
    token?: string | undefined
  ): Promise<AxiosResponse<IAuthUserInfo>> {
    const response = await $api(token).get(
      `/${PRIVATE_REQUESTS.USER_INFO}/teacher`
    )
    return response
  }

  async registration(
    props: IRegistrationTeacher
  ): Promise<AxiosResponse<IRegistrationResponse>> {
    const response = await $api().post(
      `/${PUBLIC_REQUESTS.REGISTRATION_TEACHER}`,
      {
        ...props,
      }
    )

    return response
  }

  async deleteUser(): Promise<AxiosResponse<{ data: boolean }>> {
    const response = await $api().delete(
      `/${PRIVATE_REQUESTS.USER_DELETE}/teacher`
    )

    return response
  }

  async updateUserAccountInfo(
    props: UserAccountInfoEditType
  ): Promise<AxiosResponse<IAuthUserInfo>> {
    const response = await $api('', 'multipart/form-data').post(
      `/${PRIVATE_REQUESTS.USER_INFO}/teacher`,
      {
        ...props,
        video: props.video ? props.video : null,
      }
    )

    return response
  }

  async changePassword(
    password: string
  ): Promise<AxiosResponse<{ message: string }>> {
    const response = await $api().post(
      `/${PRIVATE_REQUESTS.UPDATE_PASSWORD}/teacher`,
      {
        password: password,
      }
    )

    return response
  }
}

const teacherService = new TeacherService()

export default teacherService
