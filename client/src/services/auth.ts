import $api from '@/utils/ajax'
import { AxiosResponse } from 'axios'
import { PUBLIC_REQUESTS, PRIVATE_REQUESTS } from '@/constants/api-requests'
import { UserRole } from '../types/role'

export interface IAuthUserInfo {
  _id: string
  name: string
  surname: string
  email: string
  phone: string | null
  about: string | null
  role: UserRole
}

export async function isAuth(token?: string | undefined): Promise<{
  isAuth: true
}> {
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

export async function getUserInfo(
  role: UserRole,
  id: string,
  token?: string | undefined
): Promise<AxiosResponse<IAuthUserInfo>> {
  const response = await $api(token).get(
    `/${PRIVATE_REQUESTS.USER_INFO}/${role}`,
    {
      params: {
        id,
      },
    }
  )
  return response
}
