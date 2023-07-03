// libs
import { useState } from 'react'
import { useRouter } from 'next/router'

// types
import { LessonType } from '@/types/lessons'
import { TeacherLessonCreateType } from '@/types/teacher/teacher-lesson'

// services
import teacherLessonService from '@/services/teacher-lesson'

// other utils
import { pageRoutesPrivate } from '@/constants/page-routes'

type UseCreateLessonReturnType = {
  loading: boolean
  onSubmit: (props: TeacherLessonCreateType) => void
}

export function useCreateLesson(
  lessonType: LessonType
): UseCreateLessonReturnType {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)

  async function onSubmit(props: TeacherLessonCreateType) {
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
