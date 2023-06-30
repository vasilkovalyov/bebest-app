import { PUBLIC_REQUESTS } from '@/constants/api-requests'
import { ISubject } from '@/types/subjects'
import $api from '@/utils/ajax'
import { AxiosResponse } from 'axios'

class SubjectsService {
  async getSubjects(): Promise<AxiosResponse<ISubject[]>> {
    const response = await $api(null).get(PUBLIC_REQUESTS.GET_SUBJECTS)
    return response
  }
}

const subjectsService = new SubjectsService()
export default subjectsService
