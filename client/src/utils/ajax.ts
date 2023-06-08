import axios from 'axios'
import getConfig from 'next/config'
import cookiesService from '@/services/cookies'

type ApiContentType = 'application/json' | 'multipart/form-data'

function $api(
  token?: string | null,
  contentType: ApiContentType = 'application/json'
) {
  let authToken: string = ''
  if (token) {
    if (token.length > 0) {
      authToken = token
    } else {
      authToken = cookiesService.parseCookies('token')
    }
  } else {
    if (token !== null) {
      authToken = cookiesService.parseCookies('token')
    }
  }

  let apiUrl = ''
  if (getConfig()) {
    const { publicRuntimeConfig } = getConfig()
    apiUrl = publicRuntimeConfig.apiUrl
  } else {
    apiUrl = process.env.API_URL || ''
  }

  return axios.create({
    baseURL: `${apiUrl}/api/`,
    withCredentials: true,
    method: 'get, post, put, delete',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': contentType,
      Authorization: authToken || '',
    },
  })
}

export default $api
