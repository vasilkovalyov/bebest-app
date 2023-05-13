import axios from 'axios'
import getConfig from 'next/config'
import cookiesService from '@/services/cookies'

function $api(token?: string | undefined) {
  let authToken: string = ''
  if (token) {
    authToken = token
  } else {
    authToken = cookiesService.parseCookies('token')
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
      Authorization: authToken,
    },
  })
}

export default $api
