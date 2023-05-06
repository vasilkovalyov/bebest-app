import $api from '@/utils/ajax'
import { AxiosError, AxiosResponse } from 'axios'
import { PUBLIC_REQUESTS } from '@/constants/api-requests'
import { UserRole } from '@/types/role'

export interface ILogin {
  email: string
  password: string
}

export interface AuthenticationUserResponse {
  userId: string
  role: UserRole
  token: string
}

export async function loginUser(
  email: string,
  password: string
): Promise<AxiosResponse<AuthenticationUserResponse>> {
  const response = await $api().get(`/${PUBLIC_REQUESTS.LOGIN}`, {
    params: {
      email,
      password,
    },
  })

  return response
}
