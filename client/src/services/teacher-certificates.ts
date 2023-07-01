import { TEACHER_REQUESTS } from '@/constants/api-requests'
import { IСertificate } from '@/types/common'
import $api from '@/utils/ajax'
import { AxiosResponse } from 'axios'

class TeacherСertificatesService {
  async createCertificate(
    props: IСertificate
  ): Promise<AxiosResponse<{ message: string }>> {
    const response = await $api('', 'multipart/form-data').post(
      TEACHER_REQUESTS.CREATE_CERTIFICATE,
      {
        ...props,
      }
    )

    return response
  }

  async deleteCertificate(
    id: string
  ): Promise<AxiosResponse<{ message: string }>> {
    const response = await $api().delete(
      `${TEACHER_REQUESTS.DELETE_CERTIFICATE}/${id}`
    )

    return response
  }
}

const teacherСertificatesService = new TeacherСertificatesService()

export default teacherСertificatesService
