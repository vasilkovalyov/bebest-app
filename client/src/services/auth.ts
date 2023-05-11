import { PUBLIC_REQUESTS } from '@/constants/api-requests'

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
}

const authService = new AuthService()
export default authService
