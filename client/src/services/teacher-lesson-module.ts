import $api from '@/utils/ajax'
import { AxiosResponse } from 'axios'
import { TEACHER_REQUESTS } from '@/constants/api-requests'
import { TeacherLessonFullInfoType } from '@/types/teacher/teacher-lesson'
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
    const response = await $api().post(TEACHER_REQUESTS.CREATE_LESSON_MODULE, {
      lessonId,
      ...props,
    })
    return response
  }

  async updateLessonModule(
    lessonId: string,
    props: ITeacherLessonModule
  ): Promise<AxiosResponse<{ message: string }>> {
    const response = await $api().post(TEACHER_REQUESTS.UPDATE_LESSON_MODULE, {
      lessonId,
      ...props,
    })
    return response
  }

  async deleteLessonModule(lessonId: string, lessonModuleId: string) {
    const response = await $api().delete(
      TEACHER_REQUESTS.DELETE_LESSON_MODULE,
      {
        data: {
          lessonId: lessonId,
          lessonModuleId: lessonModuleId,
        },
      }
    )
    return response
  }

  async getLessonModule(
    id: string,
    token: string | null
  ): Promise<AxiosResponse<TeacherLessonFullInfoType>> {
    const response = await $api(token || '').get(
      `${TEACHER_REQUESTS.GET_LESSON_MODULE}/${id}`
    )
    return response
  }

  async getModulesLesson(id: string) {
    const response = await $api().get(
      `${TEACHER_REQUESTS.GET_MODULES_LESSON}/${id}`
    )
    return response
  }
}

const teacherLessonModuleService = new TeacherLessonModuleService()

export default teacherLessonModuleService
