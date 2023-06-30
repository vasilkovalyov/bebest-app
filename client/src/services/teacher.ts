import $api from '@/utils/ajax'
import { AxiosResponse } from 'axios'
import { PUBLIC_REQUESTS, TEACHER_REQUESTS } from '@/constants/api-requests'
import { IRegistrationResponse } from '@/interfaces/common'
import {
  ITeacherRegistration,
  ITeacherAccountFormFields,
  ITeacher,
  ITeacherPreviewInfo,
  ITeacherFullInfo,
} from '@/types/teacher/teacher'

class TeacherService {
  async getAccountInfo(
    token?: string | undefined
  ): Promise<AxiosResponse<ITeacher>> {
    const response = await $api(token).get(TEACHER_REQUESTS.GET_ACCOUNT_INFO)
    return response
  }

  async registration(
    props: ITeacherRegistration
  ): Promise<AxiosResponse<IRegistrationResponse>> {
    const response = await $api().post(
      `/${PUBLIC_REQUESTS.TEACHER_REGISTRATION}`,
      {
        ...props,
      }
    )

    return response
  }

  async deleteAccount(): Promise<AxiosResponse<{ data: boolean }>> {
    const response = await $api().delete(TEACHER_REQUESTS.DELETE_ACCOUNT)

    return response
  }

  async updateAccountInfo(
    props: ITeacherAccountFormFields
  ): Promise<AxiosResponse<ITeacher>> {
    const response = await $api('', 'multipart/form-data').post(
      TEACHER_REQUESTS.UPDATE_ACCOUNT_INFO,
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
    const response = await $api().post(TEACHER_REQUESTS.CHANGE_PASSWORD, {
      password: password,
    })

    return response
  }

  async getUsers(): Promise<AxiosResponse<ITeacherPreviewInfo[]>> {
    const response = await $api().get(PUBLIC_REQUESTS.GET_TEACHERS)
    return response
  }

  async getProfile(id: string): Promise<AxiosResponse<ITeacherFullInfo>> {
    const response = await $api(null).get(
      `${PUBLIC_REQUESTS.GET_TEACHER_PROFILE}/${id}`
    )
    return response
  }
}

const teacherService = new TeacherService()

export default teacherService
