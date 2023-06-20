import $api from '@/utils/ajax'
import { AxiosResponse } from 'axios'
import { PRIVATE_REQUESTS } from '@/constants/api-requests'
import { PUBLIC_REQUESTS } from '@/constants/api-requests'
import { IRegistrationResponse } from '@/interfaces/common'
import {
  ICompany,
  ICompanyAccountFormFields,
  ICompanyRegistration,
} from '@/types/company/company'

class CompanyService {
  async getUserInfo(
    token?: string | undefined
  ): Promise<AxiosResponse<ICompany>> {
    const response = await $api(token).get(
      `/${PRIVATE_REQUESTS.USER_INFO}/company`
    )
    return response
  }

  async registration(
    props: ICompanyRegistration
  ): Promise<AxiosResponse<IRegistrationResponse>> {
    const response = await $api().post(
      `/${PUBLIC_REQUESTS.REGISTRATION_COMPANY}`,
      {
        ...props,
      }
    )

    return response
  }

  async deleteUser(): Promise<AxiosResponse<{ data: boolean }>> {
    const response = await $api().delete(
      `/${PRIVATE_REQUESTS.USER_DELETE}/company`
    )

    return response
  }

  async updateUserAccountInfo(
    props: ICompanyAccountFormFields
  ): Promise<AxiosResponse<ICompany>> {
    const response = await $api().post(
      `/${PRIVATE_REQUESTS.USER_INFO}/company`,
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
      `/${PRIVATE_REQUESTS.UPDATE_PASSWORD}/company`,
      {
        password: password,
      }
    )

    return response
  }
}

const companyService = new CompanyService()

export default companyService
