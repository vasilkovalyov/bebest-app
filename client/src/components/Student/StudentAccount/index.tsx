// libs
import { useState } from 'react'

//redux
import { useAppSelector } from '@/redux/hooks'

// material ui components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'

//custom components
import AccountStudentForm from '@/components/Forms/Account/AccountStudent'
import AccountInfo from '@/components/AccountInfo'
import Icon from '@/components/Generic/Icon'
import { IconEnum } from '@/components/Generic/Icon/Icon.type'
import WarningIcon from '@/components/Generic/WarningIcon'

//hooks
import { useLogout } from '@/hooks/useLogout'

//other utils
import { AxiosError } from 'axios'
import studentService from '@/services/student'

function StudentAccount() {
  const { logOut } = useLogout()
  const user = useAppSelector((store) => store.user.user)
  const [isEdit, seIsEdit] = useState<boolean>(false)
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  function onHandleOpenModal() {
    setModalOpen(true)
  }

  function handleCloseModal() {
    setModalOpen(false)
  }

  async function handleRemoveAccount() {
    if (!user?._id) return

    try {
      const response = await studentService.deleteUser(user?._id)
      if (response.data.data) {
        logOut()
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log(e.message)
      }
    }
  }

  function onHandleClose() {
    seIsEdit(!isEdit)
  }

  return (
    <Box paddingY={4} className="student-account">
      <Stack direction="row" className="student-account__controllers">
        <Button onClick={() => seIsEdit(!isEdit)}>
          {!isEdit ? <Icon icon={IconEnum.EDIT} size={18} /> : 'Close'}
        </Button>
        <Button onClick={onHandleOpenModal}>
          <Icon icon={IconEnum.BIN} size={18} />
        </Button>
      </Stack>
      {!isEdit ? (
        <AccountInfo
          items={[
            {
              title: 'Name',
              name: user?.name || null,
            },
            {
              title: 'Surname',
              name: user?.surname || null,
            },
            {
              title: 'Email',
              name: user?.email || null,
            },
            {
              title: 'Phone',
              name: user?.phone || null,
            },
            {
              title: 'About',
              name: user?.about || null,
            },
          ]}
        />
      ) : (
        <Box maxWidth={400}>
          <AccountStudentForm onHandleClose={onHandleClose} />
        </Box>
      )}
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box className="modal-box modal-box-full">
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
            <Typography variant="h3" className="MuiTypography ta-c">
              Do you really want to remove your account?
            </Typography>
            <Stack
              direction="row"
              justifyContent="center"
              marginTop={2}
              marginBottom={2}
              spacing={3}
            >
              <Button variant="contained" onClick={handleCloseModal}>
                decline
              </Button>
              <Button variant="outlined" onClick={handleRemoveAccount}>
                accept
              </Button>
            </Stack>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}
export default StudentAccount
