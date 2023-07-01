import $api from '@/utils/ajax'
import { AxiosResponse } from 'axios'
import { UserRole } from '@/types/role'
import { UPLOAD_REQUESTS } from '@/constants/api-requests'

class UploadFileService {
  async uploadUserAvatar(
    userRole: UserRole,
    file: string
  ): Promise<AxiosResponse<{ message: string }>> {
    const response = await $api('', 'multipart/form-data').post(
      `/${userRole}/${UPLOAD_REQUESTS.UPLOAD_AVATAR}`,
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
    const response = await $api('', 'multipart/form-data').post(
      `/${userRole}/${UPLOAD_REQUESTS.UPLOAD_VIDEO}`,
      {
        video: file,
      }
    )

    return response
  }
}

const uploadFileService = new UploadFileService()

export default uploadFileService
