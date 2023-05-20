// libs
import { useState } from 'react'

// material ui components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'

//custom components
import AccountStudentForm from '@/components/Forms/Account/AccountStudent'
import AccountInfo from '@/components/AccountInfo'
import ModalPopupBox from '@/components/ModalPopupBox'
import Icon from '@/components/Generic/Icon'
import { IconEnum } from '@/components/Generic/Icon/Icon.type'

//redux
import { useSelector } from 'react-redux'
import { selectAuthState } from '@/redux/slices/auth'

//hooks
import { useLogout } from '@/hooks/useLogout'

//other utils
import { AxiosError } from 'axios'
import studentService from '@/services/student'

function StudentAccount() {
  const { logOut } = useLogout()
  const { user } = useSelector(selectAuthState)
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

  return (
    <Box paddingY={4} className="student-account">
      <Stack direction="row" className="student-account__controllers">
        <Button onClick={() => seIsEdit(!isEdit)}>
          <Icon icon={IconEnum.EDIT} size={18} />
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
              isTextarea: false,
            },
            {
              title: 'Surname',
              name: user?.surname || null,
              isTextarea: false,
            },
            {
              title: 'Email',
              name: user?.email || null,
              isTextarea: false,
            },
            {
              title: 'Phone',
              name: user?.phone || null,
              isTextarea: false,
            },
            {
              title: 'About',
              name: user?.about || null,
              isTextarea: true,
            },
          ]}
        />
      ) : (
        <Box maxWidth={400}>
          <AccountStudentForm />
        </Box>
      )}
      <Modal open={modalOpen} onClose={handleCloseModal}>
        {/* <ModalPopupBox type="full" onHandleClose={handleCloseModal}> */}
        <Box>
          <Typography variant="h2" className="MuiTypography ta-c">
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
        {/* </ModalPopupBox> */}
      </Modal>
    </Box>
  )
}
export default StudentAccount
