import { AxiosResponse } from 'axios'
import { PUBLIC_REQUESTS } from '@/constants/api-requests'
import { AuthenticationUserResponse } from '@/types/common'
import $api from '@/utils/ajax'

class AuthService {
  async isAuth(token?: string): Promise<{ isAuth: boolean }> {
    const response = await fetch(
      process.env.API_URL + `/api/${PUBLIC_REQUESTS.IS_AUTH}`,
      {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      }
    )
    const data = await response.json()
    return data
  }

  async loginUser(
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
}

const authService = new AuthService()
export default authService
