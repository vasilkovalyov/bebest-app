import $api from '@/utils/ajax'
import { AxiosResponse } from 'axios'
import { PRIVATE_REQUESTS } from '@/constants/api-requests'
import { PUBLIC_REQUESTS } from '@/constants/api-requests'
import { IRegistrationResponse } from '@/interfaces/common'
import {
  IStudent,
  IStudentAccountFormFields,
  IStudentRegistration,
} from '@/types/student/student'

class StudentService {
  async getUserInfo(
    token?: string | undefined
  ): Promise<AxiosResponse<IStudent>> {
    const response = await $api(token).get(
      `/${PRIVATE_REQUESTS.USER_INFO}/student`
    )
    return response
  }

  async registrationStudent(
    props: IStudentRegistration
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
    props: IStudentAccountFormFields
  ): Promise<AxiosResponse<IStudent>> {
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

  async getStudents(): Promise<AxiosResponse<IStudent[]>> {
    const response = await $api().get(`/${PRIVATE_REQUESTS.GET_STUDENTS}`)
    return response
  }
}

const studentService = new StudentService()

export default studentService
