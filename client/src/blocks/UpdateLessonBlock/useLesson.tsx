import { useState } from 'react'

// types
import {
  ITeacherLessonEditableProps,
  ITeacherLessonUpdateEditableProps,
} from '@/types/teacher/teacher-lesson'
import { LessonType } from '@/types/lessons'

//services
import teacherLessonService from '@/services/teacher-lesson'

type UseLessonReturnType = {
  lesson: ITeacherLessonUpdateEditableProps
  loading: boolean
  notification: boolean
  responseMessage: string | null
  onSubmit: (props: ITeacherLessonEditableProps) => void
  closeNotification: () => void
}

export function useLesson(
  lessonId: string,
  initialData: ITeacherLessonUpdateEditableProps
): UseLessonReturnType {
  const [loading, setloading] = useState<boolean>(false)
  const [lesson, setLesson] =
    useState<ITeacherLessonUpdateEditableProps>(initialData)
  const [notification, setNotification] = useState<boolean>(false)
  const [responseMessage, setResponseMessage] = useState<string | null>(null)

  async function onSubmit(props: ITeacherLessonEditableProps) {
    try {
      setloading(true)
      const response = await teacherLessonService.updateLesson({
        ...props,
        _id: lessonId,
        type: lesson?.type as LessonType,
      })

      const updateLessonResponse = await teacherLessonService.getLesson(
        lessonId,
        null
      )
      if (response.status === 200) {
        setResponseMessage(response.data.message)
        setNotification(true)
      }
      setLesson(updateLessonResponse.data)
      setloading(false)
    } catch (e) {
      console.log(e)
    }
  }

  function closeNotification() {
    setNotification(false)
  }

  return {
    lesson,
    loading,
    notification,
    responseMessage,
    onSubmit,
    closeNotification,
  }
}
