// libs
import { useEffect, useState } from 'react'

// material ui components
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Fade from '@mui/material/Fade'
import CircularProgress from '@mui/material/CircularProgress'

//custom components
import Icon from '@/components/Generic/Icon'
import { IconEnum } from '@/components/Generic/Icon/Icon.type'
import StudentSubjectsForm from '@/components/Forms/Account/StudentSubjectsForm'
import ContainerWithShadow from '@/components/Generic/ContainerWithShadow'
import PreviewStudentSubjects from '@/components/Previews/PreviewStudentSubjects'

//other utils
import studentSubjectsService, {
  IStudentSubject,
} from '@/services/student-subjects'

function StudentSubjectsBlock() {
  const [isEdit, seIsEdit] = useState<boolean>(false)
  const [subjects, setSubjects] = useState<IStudentSubject[] | []>([])
  const [loading, setLoading] = useState<boolean>(true)

  async function loadSubjects() {
    try {
      const response = await studentSubjectsService.getSubjects()
      setSubjects(response.data.subjects)
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSubjects()
  }, [])

  function onHandleClose() {
    seIsEdit(!isEdit)
  }

  return (
    <ContainerWithShadow paddingSize="sm">
      <Typography
        marginBottom={3}
        variant="h5"
        className="section-admin__heading"
      >
        Information education
      </Typography>
      <Box marginBottom={3}>
        <Divider />
      </Box>
      <Box paddingY={4} className="box-account">
        <Stack direction="row" className="box-account__controllers">
          <Button onClick={() => seIsEdit(!isEdit)}>
            {!isEdit ? <Icon icon={IconEnum.EDIT} size={18} /> : 'Close'}
          </Button>
        </Stack>
        {loading ? (
          <Box textAlign="center">
            <Fade in={true} unmountOnExit>
              <CircularProgress />
            </Fade>
          </Box>
        ) : (
          <Box>
            {!isEdit ? (
              <PreviewStudentSubjects items={subjects} />
            ) : (
              <StudentSubjectsForm onHandleClose={onHandleClose} />
            )}
          </Box>
        )}
      </Box>
    </ContainerWithShadow>
  )
}

export default StudentSubjectsBlock
