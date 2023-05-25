// libs
import { useEffect, useState } from 'react'

//redux
import { useAppSelector } from '@/redux/hooks'

// material ui components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

//custom components
import AccountInfo from '@/components/AccountInfo'
import Icon from '@/components/Generic/Icon'
import { IconEnum } from '@/components/Generic/Icon/Icon.type'
import StudentEducationInfoForm from '@/components/Forms/Account/StudentEducationInfoForm'
import { Typography } from '@mui/material'
import { IStudentEducation } from '@/components/Forms/Account/StudentEducationInfoForm/StudentEducationInfoForm.type'
import { IAccountInfo } from '@/components/AccountInfo/AccountInfo.type'

//other utils
import { PRIVATE_REQUESTS } from '@/constants/api-requests'
import $api from '@/utils/ajax'

function getInfo(subjects: IStudentEducation[]): IAccountInfo[] {
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
  const user = useAppSelector((store) => store.user.user)
  const [isEdit, seIsEdit] = useState<boolean>(false)
  const [subjects, setSubjects] = useState<IStudentEducation[] | []>([])

  async function loadSubjects() {
    const response = await $api().get(
      `/${PRIVATE_REQUESTS.GET_SUBJECTS_STUDENT}`
    )
    setSubjects(response.data.subjects)
  }

  useEffect(() => {
    loadSubjects()
  }, [])

  function onHandleClose() {
    seIsEdit(!isEdit)
  }

  return (
    <Box paddingY={4} className="student-account">
      <Stack direction="row" className="student-account__controllers">
        <Button onClick={() => seIsEdit(!isEdit)}>
          {!isEdit ? <Icon icon={IconEnum.EDIT} size={18} /> : 'Close'}
        </Button>
      </Stack>
      {!isEdit ? (
        <>
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
        </>
      ) : (
        <StudentEducationInfoForm
          initialData={{
            subjects: subjects,
          }}
          onHandleClose={onHandleClose}
        />
      )}
    </Box>
  )
}
export default StudentEducationInfo
