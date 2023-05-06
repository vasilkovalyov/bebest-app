import { useState } from 'react'
import { AxiosError, AxiosResponse } from 'axios'
import $api from '../utils/ajax'

type UseAjaxResponse<ResponseProps, RequestProps> = [
  boolean,
  string | null,
  (params: RequestProps) => Promise<AxiosResponse<ResponseProps>> | unknown
]

export const useAjax = <ResponseProps, RequestProps>(
  url: string
): UseAjaxResponse<ResponseProps, RequestProps> => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const fetchData = async (props: RequestProps) => {
    setIsLoading(true)
    setErrorMessage(null)

    try {
      const response: AxiosResponse<ResponseProps> = await $api().get(url, {
        params: props,
      })
      return response
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorMessage(error.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return [isLoading, errorMessage, fetchData]
}
