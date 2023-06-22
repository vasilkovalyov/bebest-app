import $api from '@/utils/ajax'
import { AxiosResponse } from 'axios'
import { PRIVATE_REQUESTS } from '@/constants/api-requests'
import { PUBLIC_REQUESTS } from '@/constants/api-requests'
import { IRegistrationResponse } from '@/interfaces/common'
import {
  ITeacherRegistration,
  ITeacherAccountFormFields,
  ITeacher,
  ITeacherPreviewInfo,
  ITeacherFullInfo,
} from '@/types/teacher/teacher'

class TeacherService {
  async getUserInfo(
    token?: string | undefined
  ): Promise<AxiosResponse<ITeacher>> {
    const response = await $api(token).get(
      `/${PRIVATE_REQUESTS.USER_INFO}/teacher`
    )
    return response
  }

  async registration(
    props: ITeacherRegistration
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
    props: ITeacherAccountFormFields
  ): Promise<AxiosResponse<ITeacher>> {
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

  async getUsers(): Promise<AxiosResponse<ITeacherPreviewInfo[]>> {
    const response = await $api().get(PUBLIC_REQUESTS.GET_TEACHERS)
    return response
  }

  async getUserProfile(id: string): Promise<AxiosResponse<ITeacherFullInfo>> {
    const response = await $api(null).get(
      `${PUBLIC_REQUESTS.GET_TEACHER_PROFILE}/${id}`
    )
    return response
  }
}

const teacherService = new TeacherService()

export default teacherService
