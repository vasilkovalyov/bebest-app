import { STUDENT_REQUESTS } from '@/constants/api-requests'
import { IStudentSubject } from '@/types/student/student-subject'
import $api from '@/utils/ajax'
import { AxiosResponse } from 'axios'

class StudentSubjectsService {
  async addSubject(
    subject: IStudentSubject
  ): Promise<AxiosResponse<{ message: string }>> {
    const response = await $api().post(STUDENT_REQUESTS.CREATE_SUBJECT, {
      ...subject,
    })
    return response
  }

  async deleteSubject(
    subjectId: string
  ): Promise<AxiosResponse<{ message: string }>> {
    const response = await $api().delete(
      `${STUDENT_REQUESTS.DELETE_SUBJECT}/${subjectId}`
    )
    return response
  }
}

const studentSubjectsService = new StudentSubjectsService()
export default studentSubjectsService
