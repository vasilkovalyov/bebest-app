// libs
import { useEffect, useState } from 'react'

// material ui components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Modal from '@mui/material/Modal'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

//custom components
import Icon from '@/components/Generic/Icon'
import { IconEnum } from '@/types/icons'
import WarningIcon from '@/components/Generic/WarningIcon'

import ContainerWithShadow from '@/components/Generic/ContainerWithShadow'
import UserListLesson from '@/components/UserListLesson'
import { IUserForLesson } from '@/components/UserListLesson/UserListLesson'
import AutocompleteUserListLesson from '@/components/AutocompleteUserListLesson'

//hooks

//other utils
import studentService from '@/services/student'
import teacherLessonService from '@/services/teacher-lesson'
import { useRouter } from 'next/router'
import { convertToUserListLesson } from './AttachStudentsToLessonBlock.utils'
import colors from '@/constants/colors'

const defaultUser: IUserForLesson = {
  _id: '',
  fullname: '',
  avatar: '',
}

function AttachStudentsToLessonBlock() {
  const { query } = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingStudents, setLoadingStudents] = useState<boolean>(false)
  const [options, setOptions] = useState<IUserForLesson[]>([])
  const [selectedStudent, setSelectedStudent] =
    useState<IUserForLesson>(defaultUser)
  const [students, setStudents] = useState<IUserForLesson[]>([])
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)

  function openDropdown() {
    if (options.length) return
    loadStudents()
  }

  function onOpenModal(props: IUserForLesson) {
    setSelectedStudent(props)
    setModalOpen(true)
  }

  function handleCloseModal() {
    setModalOpen(false)
  }

  async function loadStudents() {
    setLoading(true)
    try {
      const response = await studentService.getStudents()

      const options: IUserForLesson[] = response.data
        ? response.data.map((item) => {
            return {
              _id: item._id,
              fullname: item.name + ' ' + item.surname,
              avatar: item.avatar || '',
            }
          })
        : []
      setOptions(options)
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  async function onHandleAddStudent() {
    const existInArr = students.find((item) => item._id === selectedStudent._id)
    if (existInArr) {
      setSnackbarOpen(true)
      return
    }
    try {
      await teacherLessonService.addStudentToLesson(
        query._id as string,
        selectedStudent._id
      )
      setSelectedStudent(defaultUser)
      loadStudentFromLesson()
    } catch (e) {
      console.log(e)
    }
  }

  async function loadStudentFromLesson() {
    setLoadingStudents(true)
    try {
      const students = await teacherLessonService.getStudentsFromLesson(
        query._id as string
      )
      setStudents(convertToUserListLesson(students.data))
    } catch (e) {
      console.log(e)
    } finally {
      setLoadingStudents(false)
    }
  }

  async function deleteStudentFromLesson() {
    try {
      await teacherLessonService.deleteStudentFromLesson(
        query._id as string,
        selectedStudent._id
      )
      loadStudentFromLesson()
      handleCloseModal()
    } catch (e) {
      console.log(e)
    }
  }

  function handleCloseSnackbar() {
    setSnackbarOpen(false)
  }

  useEffect(() => {
    loadStudentFromLesson()
  }, [])

  return (
    <ContainerWithShadow
      paddingSize="sm"
      className="attach-student-to-lesson-block"
    >
      <Box marginBottom={2}>
        <AutocompleteUserListLesson
          loading={loading}
          openDropdown={() => openDropdown()}
          options={options as unknown as IUserForLesson[]}
          onHandleSelectUser={(prop) => {
            setSelectedStudent(prop)
          }}
        />
        <Button
          size="small"
          variant="contained"
          onClick={onHandleAddStudent}
          disabled={selectedStudent._id === ''}
        >
          Add student
        </Button>
      </Box>

      {loadingStudents ? (
        <Box textAlign="center">
          <CircularProgress size={20} />
        </Box>
      ) : (
        <>
          {students.length ? (
            <>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="subtitle2">List of students</Typography>
                <Typography variant="subtitle2">
                  {students.length} student
                  {students.length > 1 ? 's' : ''}
                </Typography>
              </Stack>
              <UserListLesson users={students} onHandleDelete={onOpenModal} />
            </>
          ) : null}
        </>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          variant="filled"
          severity="error"
          sx={{ width: '100%' }}
        >
          Student already exist in the list!
        </Alert>
      </Snackbar>
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box className="modal-box">
          <Button
            className="modal-box__button-close"
            onClick={handleCloseModal}
          >
            <Icon
              icon={IconEnum.CROSS_OUTLINE}
              size={20}
              color="#000000"
              className="modal-box__button-close-icon"
            />
          </Button>
          <Box className="modal-box__inner">
            <Box textAlign="center" marginBottom={2}>
              <WarningIcon />
            </Box>
            <Typography variant="h5" className="ta-c">
              Do you really want to remove student <br /> {'"'}
              {selectedStudent.fullname}
              {'"'}
              <br />
              from lesson?
            </Typography>
            <Stack
              direction="row"
              justifyContent="center"
              marginTop={2}
              marginBottom={2}
              spacing={3}
            >
              <Button
                size="small"
                variant="contained"
                onClick={handleCloseModal}
              >
                decline
              </Button>
              <Button
                size="small"
                variant="outlined"
                onClick={deleteStudentFromLesson}
              >
                accept
              </Button>
            </Stack>
          </Box>
        </Box>
      </Modal>
    </ContainerWithShadow>
  )
}
export default AttachStudentsToLessonBlock
