//libs
import { useState } from 'react'

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
import FieldsActivity from '../../components/Forms/FieldsActivity'

//other utils
import { ITeacherWorkExperience } from '@/services/teacher-work-experience'

function MainFieldsActivityBlock() {
  const [isEdit, seIsEdit] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [workExperiences, setWorkExperiences] = useState<
    ITeacherWorkExperience[] | []
  >([])

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
      <Box paddingY={4} className="student-account">
        <Stack direction="row" className="student-account__controllers">
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
                {workExperiences.length ? (
                  <Box>test</Box>
                ) : (
                  <Typography variant="body1">
                    No data. Click on Edit button to add information.
                  </Typography>
                )}
              </Box>
            ) : (
              <FieldsActivity
                initialData={undefined}
                onHandleUpdate={() => {}}
                onHandleClose={onHandleClose}
              />
            )}
          </Box>
        )}
      </Box>
    </ContainerWithShadow>
  )
}

export default MainFieldsActivityBlock
