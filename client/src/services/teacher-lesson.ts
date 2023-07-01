import $api from '@/utils/ajax'
import { AxiosResponse } from 'axios'
import { TEACHER_REQUESTS } from '@/constants/api-requests'
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
    const response = await $api().post(TEACHER_REQUESTS.CREATE_LESSON, {
      ...props,
    })
    return response
  }

  async updateLesson(
    props: ITeacherLesson
  ): Promise<AxiosResponse<{ message: string }>> {
    const response = await $api().post(TEACHER_REQUESTS.UPDATE_LESSON, {
      ...props,
    })
    return response
  }

  async deleteLesson(id: string) {
    const response = await $api().delete(
      `${TEACHER_REQUESTS.DELETE_LESSON}/${id}`
    )
    return response
  }

  async getLesson(
    id: string,
    token: string | null
  ): Promise<AxiosResponse<ITeacherLessonExtended>> {
    const response = await $api(token || '').get(
      `${TEACHER_REQUESTS.GET_LESSON}/${id}`
    )
    return response
  }

  async getUserLessons(): Promise<AxiosResponse<ITeacherLessonExtended[]>> {
    const response = await $api().get(TEACHER_REQUESTS.GET_LESSONS)
    return response
  }

  async addStudentToLesson(
    lessonId: string,
    studentId: string
  ): Promise<AxiosResponse<{ message: string }>> {
    const response = await $api().post(TEACHER_REQUESTS.ADD_STUDENT_TO_LESSON, {
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
      TEACHER_REQUESTS.DELETE_STUDENT_FROM_LESSON,
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
      `${TEACHER_REQUESTS.GET_STUDENTS_FROM_LESSON}/${lessonId}`
    )
    return response
  }
}

const teacherService = new TeacherLessonService()

export default teacherService
