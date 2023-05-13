// libs
import { useState } from 'react'

// material ui components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

//custom components
import AccountStudentForm from '@/components/Forms/Account/AccountStudent'
import ChangePasswordForm from '@/components/Forms/ChangePassword'
import { IChangePassword } from '@/components/Forms/ChangePassword/ChangePassword.type'
import ModalPopupBox from '@/components/ModalPopupBox'
import AccountInfo from '@/components/AccountInfo'

// layouts
import AdminLayout from '@/layouts/AdminLayout'

// other utils
import { useAuthContext } from '@/context/auth-context'
import studentService, { UserAccountInfoEditType } from '@/services/student'
import { AxiosError } from 'axios'
import { useLogout } from '@/hooks/useLogout'
import { useNotification } from '@/hooks/useNotification'

type TypeForm = 'account' | 'password' | 'remove-account'

interface IFormAjaxProps {
  isLoading: boolean
  errorMessage?: string | null
  typeForm?: TypeForm | null
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

  const [
    isVisibleNotification,
    messageNotification,
    showNotification,
    closeNotification,
    setMessageNotification,
  ] = useNotification()

  function onHandleOpenModal() {
    setModalOpen(true)
  }

  function handleCloseModal() {
    setModalOpen(false)
  }

  async function onSubmitAccount(props: UserAccountInfoEditType) {
    if (!user?._id) return

    try {
      setFormAjaxProps({
        isLoading: true,
        typeForm: 'account',
      })

      const response = await studentService.updateUserAccountInfo(
        user?._id,
        props
      )
      if (response.status === 200) {
        showNotification()
        setMessageNotification('Student account has updated')
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

  async function onSubmitChangePassword(props: IChangePassword) {
    if (!user?._id) return

    try {
      setFormAjaxProps({
        isLoading: true,
        typeForm: 'password',
      })

      const response = await studentService.changePassword(
        user?._id,
        props.confirm_password
      )
      if (response.status === 200) {
        showNotification()
        setMessageNotification(response.data.message)
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
              phone: user?.phone || '',
              about: user?.about || '',
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
      <Snackbar
        open={isVisibleNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={3000}
        onClose={closeNotification}
      >
        <Alert severity="success">{messageNotification}</Alert>
      </Snackbar>
    </AdminLayout>
  )
}

export default PageAdmin
