import { PUBLIC_REQUESTS } from '@/constants/api-requests'
import $api from '@/utils/ajax'
import { AxiosResponse } from 'axios'

export interface ISubjectSkill {
  _id: string
  subject: string
}

export interface ISubject {
  _id: string
  category: string
  children: ISubjectSkill[] | []
}

class SubjectsService {
  async getSubjects(): Promise<AxiosResponse<ISubject[]>> {
    const response = await $api().get(`/${PUBLIC_REQUESTS.GET_SUBJECTS}`)
    return response
  }
}

const subjectsService = new SubjectsService()
export default subjectsService
