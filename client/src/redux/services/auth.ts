import { serviceApi } from '../apiService'
import { PUBLIC_REQUESTS } from '@/constants/api-requests'
import { AuthenticationUserResponse } from '@/components/Forms/Login/Login.service'

export const authApi = serviceApi.injectEndpoints({
  endpoints: (build) => ({
    fetchLogin: build.query<
      AuthenticationUserResponse,
      { email: string; password: string }
    >({
      query: ({ email, password }) => ({
        method: 'GET',
        url: PUBLIC_REQUESTS.LOGIN,
        params: {
          email,
          password,
        },
      }),
      onQueryStarted: (body, { dispatch, queryFulfilled }) => {
        console.log('body', body)
      },
    }),
  }),
})

export const { useFetchLoginQuery } = authApi
export const { fetchLogin } = authApi.endpoints
