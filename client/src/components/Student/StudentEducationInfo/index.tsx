// libs
import { useEffect, useState } from 'react'

// material ui components
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Fade from '@mui/material/Fade'
import CircularProgress from '@mui/material/CircularProgress'

//custom components
import AccountInfo from '@/components/AccountInfo'
import Icon from '@/components/Generic/Icon'
import { IconEnum } from '@/components/Generic/Icon/Icon.type'
import StudentEducationInfoForm from '@/components/Forms/Account/StudentEducationInfoForm'
import { IAccountInfo } from '@/components/AccountInfo/AccountInfo.type'

//other utils
import studentSubjectsService, {
  IStudentSubject,
} from '@/services/student-subjects'

function getInfo(subjects: IStudentSubject[]): IAccountInfo[] {
  const newSubjects: IAccountInfo[] = []
  for (let item of subjects) {
    const subjectObj: IAccountInfo = {
      title: 'Subject',
      name: item.subject_study,
    }
    const subjectLevelObj: IAccountInfo = {
      title: 'The level of mastery of the subject',
      name: item.level_mastery_subject,
    }
    newSubjects.push(subjectObj)
    newSubjects.push(subjectLevelObj)
  }
  return newSubjects
}

function StudentEducationInfo() {
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

  async function onHandleUpdate() {
    await loadSubjects()
  }

  return (
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
            <Box>
              {subjects.length ? (
                <AccountInfo
                  directionItems="column"
                  gap={1}
                  items={getInfo(subjects)}
                />
              ) : (
                <Typography variant="body1">
                  No data. Click on Edit button to add information.
                </Typography>
              )}
            </Box>
          ) : (
            <StudentEducationInfoForm
              initialData={{
                subjects: subjects,
              }}
              onHandleUpdate={onHandleUpdate}
              onHandleClose={onHandleClose}
            />
          )}
        </Box>
      )}
    </Box>
  )
}
export default StudentEducationInfo
