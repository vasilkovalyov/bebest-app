// libs
import { useState } from 'react'

//redux
import { useAppSelector } from '@/redux/hooks'
import { useDispatch } from 'react-redux'
import { fetchPaymentCard } from '@/redux/slices/payment-card'

// material ui components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Stack from '@mui/material/Stack'

//custom components
import LessonForm from '@/components/Forms/Lesson'
import { ITeacherLessonEditableProps } from '@/types/teacher/teacher-lesson'

//other utils
import teacherLessonService from '@/services/teacher-lesson'
import { LessonType } from '@/types/lessons'

function CreateLessonBlock({ lessonType }: { lessonType: LessonType }) {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function onHandleSubmit(props: ITeacherLessonEditableProps) {
    setIsLoading(true)
    await teacherLessonService.createLesson({
      ...props,
      type: lessonType,
    })
    setIsLoading(false)
  }

  return (
    <Box>
      <LessonForm
        isLoading={isLoading}
        lessonType={lessonType}
        mode="create"
        onSubmit={onHandleSubmit}
      />
    </Box>
  )
}

export default CreateLessonBlock
