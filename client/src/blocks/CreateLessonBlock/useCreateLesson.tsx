// libs
import { useState } from 'react'
import { useRouter } from 'next/router'

// types
import { LessonType } from '@/types/lessons'
import { ITeacherLessonEditableProps } from '@/types/teacher/teacher-lesson'

// services
import teacherLessonService from '@/services/teacher-lesson'

// other utils
import { pageRoutesPrivate } from '@/constants/page-routes'

type UseCreateLessonReturnType = {
  loading: boolean
  onSubmit: (props: ITeacherLessonEditableProps) => void
}

export function useCreateLesson(
  lessonType: LessonType
): UseCreateLessonReturnType {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)

  async function onSubmit(props: ITeacherLessonEditableProps) {
    try {
      setLoading(true)
      const response = await teacherLessonService.createLesson({
        ...props,
        type: lessonType,
      })
      router.push(
        `/${pageRoutesPrivate.cabinetUpdateLesson}/${response.data._id}`
      )
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    onSubmit,
  }
}
