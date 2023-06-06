import $api from '@/utils/ajax'
import { AxiosResponse } from 'axios'
import { UserRole } from '@/types/role'
import { PRIVATE_REQUESTS } from '@/constants/api-requests'

class UploadFileService {
  async uploadUserAvatar(
    userRole: UserRole,
    file: string
  ): Promise<AxiosResponse<{ message: string }>> {
    const response = await $api().post(
      `/${PRIVATE_REQUESTS.UPLOAD_AVATAR}/${userRole}`,
      {
        avatar: file,
      }
    )

    return response
  }

  async uploadVideo(
    userRole: UserRole,
    file: string
  ): Promise<AxiosResponse<{ message: string }>> {
    const response = await $api().post(
      `/${PRIVATE_REQUESTS.UPLOAD_VIDEO}/${userRole}`,
      {
        video: file,
      }
    )

    return response
  }
}

const uploadFileService = new UploadFileService()

export default uploadFileService
