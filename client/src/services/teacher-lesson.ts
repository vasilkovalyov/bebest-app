import $api from '@/utils/ajax'
import { AxiosResponse } from 'axios'
import { PRIVATE_REQUESTS } from '@/constants/api-requests'
import { PUBLIC_REQUESTS } from '@/constants/api-requests'
import { IRegistrationResponse } from '@/interfaces/common'
import {
  ITeacherLesson,
  ITeacherLessonExtended,
} from '@/types/teacher/teacher-lesson'
import { IStudentInfoLesson } from '@/types/student/student'

class TeacherLessonService {
  async createLesson(props: ITeacherLesson): Promise<
    AxiosResponse<{
      message: string
      _id: string
    }>
  > {
    const response = await $api().post(
      `/${PRIVATE_REQUESTS.CREATE_LESSON}/teacher`,
      {
        ...props,
      }
    )
    return response
  }

  async updateLesson(
    props: ITeacherLesson
  ): Promise<AxiosResponse<{ message: string }>> {
    const response = await $api().post(
      `/${PRIVATE_REQUESTS.UPDATE_LESSON}/teacher`,
      {
        ...props,
      }
    )
    return response
  }

  async removeLessonById(id: string) {
    const response = await $api().delete(
      `/${PRIVATE_REQUESTS.DELETE_LESSON}/teacher/${id}`
    )
    return response
  }

  async getLessonById(
    id: string,
    token: string | null
  ): Promise<AxiosResponse<ITeacherLessonExtended>> {
    const response = await $api(token || '').get(
      `${PRIVATE_REQUESTS.GET_LESSON}/teacher/${id}`
    )
    return response
  }

  async getUserLessons(): Promise<AxiosResponse<ITeacherLessonExtended[]>> {
    const response = await $api().get(`${PRIVATE_REQUESTS.GET_LESSONS}/teacher`)
    return response
  }

  async addStudentToLesson(
    lessonId: string,
    studentId: string
  ): Promise<AxiosResponse<{ message: string }>> {
    const response = await $api().post(PRIVATE_REQUESTS.ADD_STUDENT_TO_LESSON, {
      lessonId,
      studentId,
    })
    return response
  }

  async deleteStudentFromLesson(
    lessonId: string,
    studentId: string
  ): Promise<AxiosResponse<{ message: string }>> {
    const response = await $api().delete(
      PRIVATE_REQUESTS.DELETE_STUDENT_FROM_LESSON,
      {
        data: {
          lessonId: lessonId,
          studentId: studentId,
        },
      }
    )
    return response
  }

  async getStudentsFromLesson(
    lessonId: string
  ): Promise<AxiosResponse<IStudentInfoLesson[]>> {
    const response = await $api().get(
      `${PRIVATE_REQUESTS.GET_STUDENTS_FROM_LESSON}/${lessonId}`
    )
    return response
  }
}

const teacherService = new TeacherLessonService()

export default teacherService
