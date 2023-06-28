// libs
import { useState } from 'react'
import { useRouter } from 'next/router'

// material ui components
import Box from '@mui/material/Box'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'

//custom components
import LessonForm from '@/components/Forms/Lesson'
import {
  ITeacherLessonEditableProps,
  ITeacherLessonExtended,
  ITeacherLessonUpdateEditableProps,
} from '@/types/teacher/teacher-lesson'

//other utils
import teacherLessonService from '@/services/teacher-lesson'
import { LessonType } from '@/types/lessons'
import AlertTitle from '@mui/material/AlertTitle'

//relate utils
import { IUpdateLessonBlockProps } from './UpdateLessonBlock.type'

function UpdateLessonBlock({ initialData }: IUpdateLessonBlockProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showNotification, setShowNotification] = useState(false)
  const { query } = useRouter()
  const [lesson, setLesson] =
    useState<ITeacherLessonUpdateEditableProps>(initialData)
  const [responseMessage, setResponseMessage] = useState<string | null>(null)

  async function onHandleSubmit(props: ITeacherLessonEditableProps) {
    setIsLoading(true)
    const response = await teacherLessonService.updateLesson({
      ...props,
      _id: query._id as string,
      type: lesson?.type as LessonType,
    })
    if (response.status === 200) {
      setShowNotification(true)
      setResponseMessage(response.data.message)
    }
    const updateLessonResponse = await teacherLessonService.getLessonById(
      query._id as string,
      null
    )
    setLesson(updateLessonResponse.data)
    setIsLoading(false)
    closeNotification()
  }

  function closeNotification() {
    setShowNotification(false)
  }

  return (
    <Box>
      <LessonForm
        isLoading={isLoading}
        lessonType={lesson?.type}
        mode="update"
        initialData={{
          ...lesson,
          subject: lesson.subject._id,
        }}
        onSubmit={onHandleSubmit}
      />
      <Snackbar
        open={showNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={3000}
        onClose={closeNotification}
      >
        <Alert
          variant="filled"
          severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={closeNotification}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <AlertTitle color="inherit">Success</AlertTitle>
          {responseMessage}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default UpdateLessonBlock
