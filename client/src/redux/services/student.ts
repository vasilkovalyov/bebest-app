import { serviceApi } from '../apiService'
import { PRIVATE_REQUESTS } from '@/constants/api-requests'
import { IAuthUserInfo } from '../slices/auth'
import { UserAccountInfoEditType } from '@/services/student'
import { UserRole } from '@/types/role'

export const userApi = serviceApi.injectEndpoints({
  endpoints: (build) => ({
    fetchGetUserAccount: build.query<
      IAuthUserInfo,
      { role: UserRole; id: string; token?: string | undefined }
    >({
      query: ({ id, role }) => ({
        method: 'GET',
        url: `/${PRIVATE_REQUESTS.USER_INFO}/${role}`,
        params: {
          id,
        },
      }),
    }),
    fetchUpdateUserAccount: build.mutation<
      IAuthUserInfo,
      { id: string; props: UserAccountInfoEditType }
    >({
      query: ({ id, props }) => ({
        method: 'POST',
        url: `${PRIVATE_REQUESTS.USER_INFO}/student`,
        body: {
          _id: id,
          ...props,
        },
      }),
      transformResponse: (response: IAuthUserInfo) => response,
    }),
  }),
})

export const {
  useFetchGetUserAccountQuery,
  useFetchUpdateUserAccountMutation,
} = userApi
