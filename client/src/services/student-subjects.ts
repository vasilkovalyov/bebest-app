import { PRIVATE_REQUESTS } from '@/constants/api-requests'
import $api from '@/utils/ajax'
import { AxiosResponse } from 'axios'

export interface IStudentSubject {
  _id?: string
  subject_study: string
  level_mastery_subject: string
}

export interface IStudentSubjectsResponse {
  subjects: IStudentSubject[] | []
  _id: string
}

class StudentSubjectsService {
  async getSubjects(): Promise<AxiosResponse<IStudentSubjectsResponse>> {
    const response = await $api().get(
      `/${PRIVATE_REQUESTS.GET_SUBJECTS_STUDENT}`
    )
    return response
  }

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
