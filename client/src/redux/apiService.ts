import {
  createApi,
  fetchBaseQuery,
  coreModule,
  reactHooksModule,
  buildCreateApi,
} from '@reduxjs/toolkit/query/react'
import getConfig from 'next/config'
import cookiesService from '@/services/cookies'
import { HYDRATE } from 'next-redux-wrapper'

const { publicRuntimeConfig } = getConfig()

export const createApiHandler = buildCreateApi(
  coreModule(),
  reactHooksModule({ unstable__sideEffectsInRender: true })
)

export const serviceApi = createApi({
  reducerPath: 'serviceApi',
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  baseQuery: fetchBaseQuery({
    baseUrl: `${publicRuntimeConfig.apiUrl}/api/`,
    credentials: 'include',
    prepareHeaders(headers, _) {
      const token = cookiesService.parseCookies('token')
      if (token) {
        headers.set('Authorization', token)
        headers.set('X-Requested-With', 'XMLHttpRequest')
      }
      return headers
    },
  }),
  endpoints: (builder) => ({}),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
