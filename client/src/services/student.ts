import $api from '@/utils/ajax'
import { AxiosResponse } from 'axios'
import { STUDENT_REQUESTS } from '@/constants/api-requests'
import { PUBLIC_REQUESTS } from '@/constants/api-requests'
import { IRegistrationResponse } from '@/interfaces/common'
import {
  IStudent,
  IStudentAccountFormFields,
  IStudentRegistration,
} from '@/types/student/student'

class StudentService {
  async getAccountInfo(
    token?: string | undefined
  ): Promise<AxiosResponse<IStudent>> {
    const response = await $api(token).get(STUDENT_REQUESTS.GET_ACCOUNT_INFO)
    return response
  }

  async registrationStudent(
    props: IStudentRegistration
  ): Promise<AxiosResponse<IRegistrationResponse>> {
    const response = await $api().post(
      `/${PUBLIC_REQUESTS.STUDENT_REGISTRATION}`,
      {
        ...props,
        role: 'student',
      }
    )

    return response
  }

  async deleteAccount(): Promise<AxiosResponse<{ data: boolean }>> {
    const response = await $api().delete(STUDENT_REQUESTS.DELETE_ACCOUNT)

    return response
  }

  async updateAccountInfo(
    props: IStudentAccountFormFields
  ): Promise<AxiosResponse<IStudent>> {
    const response = await $api().post(STUDENT_REQUESTS.UPDATE_ACCOUNT_INFO, {
      ...props,
    })

    return response
  }

  async changePassword(
    password: string
  ): Promise<AxiosResponse<{ message: string }>> {
    const response = await $api().post(STUDENT_REQUESTS.CHANGE_PASSWORD, {
      password: password,
    })

    return response
  }

  async getStudents(): Promise<AxiosResponse<IStudent[]>> {
    const response = await $api().get(`/${STUDENT_REQUESTS.GET_STUDENTS}`)
    return response
  }
}

const studentService = new StudentService()

export default studentService
