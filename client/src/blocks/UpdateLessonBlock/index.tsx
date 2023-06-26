// libs
import { useEffect, useState } from 'react'
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
} from '@/types/teacher/teacher-lesson'

//relate utils

//other utils
import teacherLessonService from '@/services/teacher-lesson'
import { LessonType } from '@/types/lessons'
import AlertTitle from '@mui/material/AlertTitle'

function UpdateLessonBlock() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showNotification, setShowNotification] = useState(false)
  const { query } = useRouter()
  const [lesson, setLesson] = useState<ITeacherLessonExtended | null>()
  const [responseMessage, setResponseMessage] = useState<string | null>(null)

  async function loadLesson() {
    const response = await teacherLessonService.getLessonById(
      query._id as string
    )
    setLesson(response.data)
  }

  async function onHandleSubmit(props: ITeacherLessonEditableProps) {
    setIsLoading(true)
    const response = await teacherLessonService.updateLesson({
      ...props,
      type: lesson?.type as LessonType,
    })
    if (response.status === 200) {
      setShowNotification(true)
      setResponseMessage(response.data.message)
    }
    setIsLoading(false)
  }

  function closeNotification() {
    setShowNotification(false)
  }

  useEffect(() => {
    loadLesson()
  }, [])

  return (
    <Box>
      {lesson ? (
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
      ) : null}
      <Snackbar
        open={showNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={4000}
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
