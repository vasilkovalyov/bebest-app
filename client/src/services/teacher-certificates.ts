import { PRIVATE_REQUESTS } from '@/constants/api-requests'
import $api from '@/utils/ajax'
import { AxiosResponse } from 'axios'

export interface IUserСertificate {
  _id?: string
  name: string
  date: string
  image?: string | null
}

class TeacherСertificatesService {
  async addCertificate(
    props: IUserСertificate
  ): Promise<AxiosResponse<{ message: string }>> {
    const response = await $api('', 'multipart/form-data').post(
      `/${PRIVATE_REQUESTS.UPLOAD_CERTIFICATE}/teacher`,
      {
        ...props,
      }
    )

    return response
  }

  async removeCertificate(
    id: string
  ): Promise<AxiosResponse<{ message: string }>> {
    const response = await $api().delete(
      `/${PRIVATE_REQUESTS.UPLOAD_CERTIFICATE}/teacher/${id}`
    )

    return response
  }
}

const teacherСertificatesService = new TeacherСertificatesService()

export default teacherСertificatesService
