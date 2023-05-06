import axios from 'axios'
import getConfig from 'next/config'

function $api(token?: string) {
  const { publicRuntimeConfig } = getConfig()
  return axios.create({
    baseURL: `${publicRuntimeConfig.apiUrl}/api/`,
    withCredentials: true,
    method: 'get, post, put, delete',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      Authorization: token || '',
    },
  })
}

export default $api
