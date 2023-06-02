//libs
import { useState } from 'react'

//redux
import { useAppSelector } from '@/redux/hooks'

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
import ContainerWithShadow from '@/components/Generic/ContainerWithShadow'
import UserFieldsActivity from '../../components/Forms/UserFieldsActivity'
import PreviewInfo from '@/components/PreviewInfo'

function UserFieldsActivityBlock() {
  const teacherPersonalInfo = useAppSelector(
    (store) => store.teacherPersonalInfo
  )

  const [isEdit, seIsEdit] = useState<boolean>(false)

  function onHandleClose() {
    seIsEdit(!isEdit)
  }

  return (
    <ContainerWithShadow paddingSize="sm">
      <Typography marginBottom={3} variant="h5">
        Main field(s) of activity
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
        {teacherPersonalInfo.loading ? (
          <Box textAlign="center">
            <Fade in={true} unmountOnExit>
              <CircularProgress />
            </Fade>
          </Box>
        ) : (
          <>
            {!isEdit ? (
              <>
                {teacherPersonalInfo.fields_activity.length ? (
                  <>
                    {teacherPersonalInfo.fields_activity.map((field, index) => (
                      <Box key={field._id} marginBottom={2}>
                        <PreviewInfo
                          heading="Activity"
                          values={[field.activity]}
                        />
                        <PreviewInfo heading="Skills" values={field.skills} />
                        {teacherPersonalInfo.fields_activity.length !== 1 &&
                        teacherPersonalInfo.fields_activity.length - 1 !==
                          index ? (
                          <Box marginTop={3} marginBottom={3}>
                            <Divider />
                          </Box>
                        ) : null}
                      </Box>
                    ))}
                  </>
                ) : (
                  <Typography variant="body1">
                    No data. Click on Edit button to add information.
                  </Typography>
                )}
              </>
            ) : (
              <UserFieldsActivity onHandleClose={onHandleClose} />
            )}
          </>
        )}
      </Box>
    </ContainerWithShadow>
  )
}

export default UserFieldsActivityBlock
