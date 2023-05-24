// libs
import { useState } from 'react'

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

function StudentEducationInfo() {
  const user = useAppSelector((store) => store.user.user)
  const [isEdit, seIsEdit] = useState<boolean>(false)

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
          <Typography variant="body1">
            No data. Click on Edit button to add information.
          </Typography>
          <AccountInfo directionItems="column" gap={1} items={[]} />
        </>
      ) : (
        <StudentEducationInfoForm onHandleClose={onHandleClose} />
      )}
    </Box>
  )
}
export default StudentEducationInfo
