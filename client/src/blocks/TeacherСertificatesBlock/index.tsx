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
import { IconEnum } from '@/types/icons'
import ContainerWithShadow from '@/components/Generic/ContainerWithShadow'
import TeacherCertificates from '@/components/Forms/TeacherCertificates'
import PreviewCertificates from '@/components/Previews/PreviewCertificates'

//other utils

function TeacherСertificatesBlock() {
  const [isEdit, seIsEdit] = useState<boolean>(false)

  const teacherPersonalInfo = useAppSelector(
    (store) => store.teacherPersonalInfo
  )

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
        Сertificates
      </Typography>
      <Box marginBottom={3}>
        <Divider />
      </Box>
      <Box className="box-account">
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
          <Box width={'70%'} maxWidth={500}>
            {!isEdit ? (
              <PreviewCertificates items={teacherPersonalInfo.certificates} />
            ) : (
              <TeacherCertificates onHandleClose={onHandleClose} />
            )}
          </Box>
        )}
      </Box>
    </ContainerWithShadow>
  )
}

export default TeacherСertificatesBlock
