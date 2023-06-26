// libs
import { useState } from 'react'
import { useRouter } from 'next/router'

// material ui components
import Box from '@mui/material/Box'

//custom components
import LessonForm from '@/components/Forms/Lesson'
import { ITeacherLessonEditableProps } from '@/types/teacher/teacher-lesson'

//other utils
import teacherLessonService from '@/services/teacher-lesson'
import { LessonType } from '@/types/lessons'
import { pageRoutesPrivate } from '@/constants/page-routes'

function CreateLessonBlock({ lessonType }: { lessonType: LessonType }) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  async function onHandleSubmit(props: ITeacherLessonEditableProps) {
    setIsLoading(true)
    const response = await teacherLessonService.createLesson({
      ...props,
      type: lessonType,
    })
    setIsLoading(false)
    router.push(
      `/${pageRoutesPrivate.cabinetUpdateLesson}/${response.data._id}`
    )
  }

  return (
    <LessonForm
      isLoading={isLoading}
      lessonType={lessonType}
      mode="create"
      onSubmit={onHandleSubmit}
    />
  )
}

export default CreateLessonBlock
