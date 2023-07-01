// libs
import { useRouter } from 'next/router'

// hooks
import { useLesson } from './useLesson'

// material ui components
import Box from '@mui/material/Box'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'

//custom components
import LessonForm from '@/components/Forms/Lesson'

//other utils
import AlertTitle from '@mui/material/AlertTitle'

//relate utils
import { IUpdateLessonBlockProps } from './UpdateLessonBlock.type'

function UpdateLessonBlock({ initialData }: IUpdateLessonBlockProps) {
  const { query } = useRouter()
  const {
    lesson,
    loading,
    responseMessage,
    notification,
    onSubmit,
    closeNotification,
  } = useLesson(query._id as string, initialData)

  return (
    <Box>
      <LessonForm
        isLoading={loading}
        lessonType={lesson?.type}
        mode="update"
        initialData={{
          ...lesson,
          subject: lesson.subject._id,
        }}
        onSubmit={onSubmit}
      />
      <Snackbar
        open={notification}
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
