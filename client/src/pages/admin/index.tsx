// libs
import { useState } from 'react'

// material ui components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'

//custom components
import AccountStudentForm from '@/components/Forms/Account/AccountStudent'
import { IAccountStudent } from '@/components/Forms/Account/AccountStudent/AccountStudent.type'
import ChangePasswordForm from '@/components/Forms/ChangePassword'
import { IChangePassword } from '@/components/Forms/ChangePassword/ChangePassword.type'
import ModalPopupBox from '@/components/ModalPopupBox'

// layouts
import AdminLayout from '@/layouts/AdminLayout'

// other utils
import { useAuthContext } from '@/context/auth-context'
import studentService from '@/services/student'
import { AxiosError } from 'axios'
import { useLogout } from '../../hooks/useLogout'

interface IFormAjaxProps {
  isLoading: boolean
  errorMessage?: string | null
  typeForm?: 'account' | 'password' | 'remove-account' | null
}

function PageAdmin() {
  const { user } = useAuthContext()
  const { logOut } = useLogout()
  const [formAjaxProps, setFormAjaxProps] = useState<IFormAjaxProps>({
    isLoading: false,
  })
  const [editFormAccount, setEditFormAccount] = useState<boolean>(false)
  const [editFormPassword, setEditFormPassword] = useState<boolean>(false)

  const [modalOpen, setModalOpen] = useState<boolean>(false)

  function onHandleOpenModal() {
    setModalOpen(true)
  }

  function handleCloseModal() {
    setModalOpen(false)
  }

  async function onSubmitAccount(props: IAccountStudent) {
    setFormAjaxProps({
      isLoading: true,
      typeForm: 'account',
    })

    setTimeout(() => {
      console.log('props', props)
      setFormAjaxProps({
        isLoading: false,
        typeForm: null,
        errorMessage: null,
      })
    }, 1000)
  }

  async function onSubmitChangePassword(props: IChangePassword) {
    setFormAjaxProps({
      isLoading: true,
      typeForm: 'password',
    })

    setTimeout(() => {
      console.log('props', props)
      setFormAjaxProps({
        isLoading: false,
        typeForm: null,
        errorMessage: null,
      })
    }, 1000)
  }

  async function handleRemoveAccount() {
    if (!user?._id) return
    setFormAjaxProps({
      isLoading: true,
      typeForm: 'remove-account',
    })

    try {
      const response = await studentService.deleteUser(user?._id)
      if (response.data.data) {
        logOut()
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log(e.message)
      }
    } finally {
      setFormAjaxProps({
        isLoading: false,
        typeForm: null,
        errorMessage: null,
      })
    }
  }

  return (
    <AdminLayout heading="Account">
      <Box className="account-panel">
        <Button
          onClick={() => setEditFormAccount(!editFormAccount)}
          className="account-panel__edit-btn"
        >
          Edit
        </Button>
        {!editFormAccount ? (
          <Box>
            <Typography variant="subtitle1" className="font-normal">
              Name
            </Typography>
            <Typography
              variant="subtitle2"
              className="color-grey-3"
              marginBottom={2}
            >
              {user?.name}
            </Typography>
            <Typography variant="subtitle1" className="font-normal">
              Surname
            </Typography>
            <Typography
              variant="subtitle2"
              className="color-grey-3"
              marginBottom={2}
            >
              {user?.surname}
            </Typography>
            <Typography variant="subtitle1" className="font-normal">
              Email
            </Typography>
            <Typography
              variant="subtitle2"
              className="color-grey-3"
              marginBottom={2}
            >
              {user?.email}
            </Typography>
            {user?.phone ? (
              <>
                <Typography variant="subtitle1" className="font-normal">
                  Phone
                </Typography>
                <Typography
                  variant="subtitle2"
                  className="color-grey-3"
                  marginBottom={2}
                >
                  {user?.phone}
                </Typography>
              </>
            ) : null}
          </Box>
        ) : (
          <AccountStudentForm
            onSubmit={onSubmitAccount}
            isLoading={formAjaxProps.typeForm === 'account' ? true : false}
            validationMessage={
              formAjaxProps.typeForm === 'account'
                ? formAjaxProps.errorMessage
                : null
            }
            initialData={{
              email: user?.email || '',
              name: user?.name || '',
              surname: user?.surname || '',
            }}
          />
        )}
        <Button
          onClick={() => setEditFormPassword(!editFormPassword)}
          className="account-panel__edit-btn"
        >
          Change password
        </Button>
        {editFormPassword ? (
          <Box mb={3}>
            <ChangePasswordForm
              onSubmit={onSubmitChangePassword}
              isLoading={formAjaxProps.typeForm === 'password' ? true : false}
              validationMessage={
                formAjaxProps.typeForm === 'password'
                  ? formAjaxProps.errorMessage
                  : null
              }
            />
          </Box>
        ) : null}
      </Box>
      <Box>
        <Button onClick={onHandleOpenModal} type="submit" variant="contained">
          Remove account
        </Button>
      </Box>
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <>
          <ModalPopupBox type="full" onHandleClose={handleCloseModal}>
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
                  {formAjaxProps.isLoading ? (
                    <CircularProgress size={16} />
                  ) : null}
                </Button>
              </Stack>
            </Box>
          </ModalPopupBox>
        </>
      </Modal>
    </AdminLayout>
  )
}

export default PageAdmin
