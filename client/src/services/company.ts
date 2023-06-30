import $api from '@/utils/ajax'
import { AxiosResponse } from 'axios'
import { COMPANY_REQUESTS } from '@/constants/api-requests'
import { PUBLIC_REQUESTS } from '@/constants/api-requests'
import { IRegistrationResponse } from '@/interfaces/common'
import {
  ICompany,
  ICompanyAccountFormFields,
  ICompanyRegistration,
} from '@/types/company/company'

class CompanyService {
  async getAccountInfo(
    token?: string | undefined
  ): Promise<AxiosResponse<ICompany>> {
    const response = await $api(token).get(COMPANY_REQUESTS.GET_ACCOUNT_INFO)
    return response
  }

  async registration(
    props: ICompanyRegistration
  ): Promise<AxiosResponse<IRegistrationResponse>> {
    const response = await $api().post(
      `/${PUBLIC_REQUESTS.COMPANY_REGISTRATION}`,
      {
        ...props,
      }
    )

    return response
  }

  async deleteAccount(): Promise<AxiosResponse<{ data: boolean }>> {
    const response = await $api().delete(COMPANY_REQUESTS.DELETE_ACCOUNT)

    return response
  }

  async updateAccountInfo(
    props: ICompanyAccountFormFields
  ): Promise<AxiosResponse<ICompany>> {
    const response = await $api().post(COMPANY_REQUESTS.UPDATE_ACCOUNT_INFO, {
      ...props,
    })

    return response
  }

  async changePassword(
    password: string
  ): Promise<AxiosResponse<{ message: string }>> {
    const response = await $api().post(COMPANY_REQUESTS.CHANGE_PASSWORD, {
      password: password,
    })

    return response
  }
}

const companyService = new CompanyService()

export default companyService
