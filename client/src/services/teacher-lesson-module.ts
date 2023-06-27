import $api from '@/utils/ajax'
import { AxiosResponse } from 'axios'
import { PRIVATE_REQUESTS } from '@/constants/api-requests'
import {
  ITeacherLesson,
  ITeacherLessonExtended,
} from '@/types/teacher/teacher-lesson'
import { ITeacherLessonModule } from '@/types/teacher/teacher-lesson-module'

class TeacherLessonModuleService {
  async createLessonModule(
    lessonId: string,
    props: ITeacherLessonModule
  ): Promise<
    AxiosResponse<{
      message: string
      _id: string
    }>
  > {
    const response = await $api().post(
      `/${PRIVATE_REQUESTS.CREATE_LESSON_MODULE}/teacher`,
      {
        lessonId,
        ...props,
      }
    )
    return response
  }

  async updateLessonModule(
    props: ITeacherLessonModule
  ): Promise<AxiosResponse<{ message: string }>> {
    const response = await $api().post(
      `/${PRIVATE_REQUESTS.UPDATE_LESSON_MODULE}/teacher`,
      {
        ...props,
      }
    )
    return response
  }

  async deleteLessonModuleById(lessonId: string, lessonModuleId: string) {
    const response = await $api().delete(
      `/${PRIVATE_REQUESTS.DELETE_LESSON_MODULE}/teacher`,
      {
        data: {
          lessonId: lessonId,
          lessonModuleId: lessonModuleId,
        },
      }
    )
    return response
  }

  async getLessonModuleById(
    id: string,
    token: string | null
  ): Promise<AxiosResponse<ITeacherLessonExtended>> {
    const response = await $api(token || '').get(
      `${PRIVATE_REQUESTS.GET_LESSON_MODULE}/teacher/${id}`
    )
    return response
  }

  async getLessonModules(id: string) {
    const response = await $api().get(
      `${PRIVATE_REQUESTS.GET_MODULES_LESSON}/teacher/${id}`
    )
    return response
  }
}

const teacherLessonModuleService = new TeacherLessonModuleService()

export default teacherLessonModuleService
