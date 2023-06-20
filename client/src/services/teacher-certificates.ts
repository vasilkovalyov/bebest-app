import { PRIVATE_REQUESTS } from '@/constants/api-requests'
import { IСertificate } from '@/types/common'
import $api from '@/utils/ajax'
import { AxiosResponse } from 'axios'

class TeacherСertificatesService {
  async addCertificate(
    props: IСertificate
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
