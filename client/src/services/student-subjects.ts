import { PRIVATE_REQUESTS } from '@/constants/api-requests'
import { IStudentSubject } from '@/redux/slices/student-subjects'
import $api from '@/utils/ajax'
import { AxiosResponse } from 'axios'

class StudentSubjectsService {
  async addSubject(
    subject: IStudentSubject
  ): Promise<AxiosResponse<{ message: string }>> {
    const response = await $api().post(
      `/${PRIVATE_REQUESTS.ADD_SUBJECT_STUDENT}`,
      {
        ...subject,
      }
    )
    return response
  }

  async removeSubject(
    subjectId: string
  ): Promise<AxiosResponse<{ message: string }>> {
    const response = await $api().delete(
      `/${PRIVATE_REQUESTS.REMOVE_SUBJECT_STUDENT}/${subjectId}`
    )
    return response
  }
}

const studentSubjectsService = new StudentSubjectsService()
export default studentSubjectsService
