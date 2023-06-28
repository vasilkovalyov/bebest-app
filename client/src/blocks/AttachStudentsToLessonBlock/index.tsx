// libs
import { useEffect, useState } from 'react'

// material ui components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress'
import Avatar from '@mui/material/Avatar'

//custom components
import ContainerWithShadow from '@/components/Generic/ContainerWithShadow'
import { IStudent } from '@/types/student/student'
import Icon from '@/components/Generic/Icon'
import { IconEnum } from '@/types/icons'

//hooks

//other utils
import studentService from '@/services/student'
import teacherLessonService from '@/services/teacher-lesson'
import { useRouter } from 'next/router'

interface IRenderOption {
  props: IStudent
  onClick?: (props: IStudent) => void
}

function RenderOption({ props, onClick }: IRenderOption) {
  const fullname = props.name + ' ' + props.surname

  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={1}
      onClick={() => onClick && onClick(props)}
    >
      <Avatar
        alt={fullname}
        src={props.avatar || ''}
        style={{ width: '30px', height: '30px' }}
      />
      <Typography variant="body1" marginBottom={0}>
        {fullname}
      </Typography>
    </Stack>
  )
}

const defaultStudent: IStudent = {
  _id: '',
  email: '',
  name: '',
  role: null,
  surname: '',
  about: '',
  avatar: '',
  phone: '',
}

type StudentType = Omit<IStudent, 'role' | 'phone' | 'about'>

function AttachStudentsToLessonBlock() {
  const { query } = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingStudents, setLoadingStudents] = useState<boolean>(false)
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState<IStudent[]>([])
  const [selectedStudent, setSelectedStudent] =
    useState<IStudent>(defaultStudent)
  const [students, setStudents] = useState<StudentType[]>([])

  async function loadStudents() {
    setLoading(true)
    try {
      const response = await studentService.getStudents()
      setOptions(response.data)
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (options.length) return
    if (!open) return
    loadStudents()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  async function onHandleAddStudent() {
    try {
      await teacherLessonService.addStudentToLesson(
        query._id as string,
        selectedStudent._id
      )
      setSelectedStudent(defaultStudent)
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
      setStudents(students.data)
    } catch (e) {
      console.log(e)
    } finally {
      setLoadingStudents(false)
    }
  }

  async function deleteStudentFromLesson(studentId: string) {
    try {
      await teacherLessonService.deleteStudentFromLesson(
        query._id as string,
        studentId
      )
      loadStudentFromLesson()
    } catch (e) {
      console.log(e)
    }
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
        <Box marginBottom={2}>
          <Autocomplete
            open={open}
            disableClearable
            onOpen={() => {
              setOpen(true)
            }}
            onClose={() => {
              setOpen(false)
            }}
            getOptionLabel={(option) => `${option.name} ${option.surname}`}
            isOptionEqualToValue={(option, value) => option._id === value._id}
            renderOption={(props, option) => (
              <Box
                key={option._id}
                paddingX={2}
                marginBottom={1}
                paddingY={1}
                {...(props as any)}
              >
                <RenderOption props={option} onClick={setSelectedStudent} />
              </Box>
            )}
            onChange={(_, props) => {
              setSelectedStudent(props)
            }}
            options={options}
            loading={loading}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select student"
                variant="standard"
                className="form-field"
                fullWidth
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
        </Box>
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
                  {students.length} student{students.length > 1 ? 's' : ''}
                </Typography>
              </Stack>
              {students.map((student) => (
                <Stack
                  key={student._id}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Avatar
                    alt={`${student.name} ${student.surname}`}
                    src={student.avatar || ''}
                    style={{ width: '30px', height: '30px' }}
                  />
                  <Typography marginBottom={0} marginX={2} variant="body1">
                    {student.name} {student.surname}
                  </Typography>
                  <Box marginLeft="auto">
                    <Button
                      size="small"
                      onClick={() => deleteStudentFromLesson(student._id)}
                    >
                      <Icon icon={IconEnum.BIN} size={14} />
                    </Button>
                  </Box>
                </Stack>
              ))}
            </>
          ) : null}
        </>
      )}
    </ContainerWithShadow>
  )
}
export default AttachStudentsToLessonBlock
