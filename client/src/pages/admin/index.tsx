// libs
import { useState } from 'react'

// material ui components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

//custom components
import AccountStudentForm from '@/components/Forms/Account/AccountStudent'
import { IAccountStudent } from '@/components/Forms/Account/AccountStudent/AccountStudent.type'
import ChangePasswordForm from '@/components/Forms/ChangePassword'
import { IChangePassword } from '@/components/Forms/ChangePassword/ChangePassword.type'

// layouts
import AdminLayout from '@/layouts/AdminLayout'

// other utils
import { useAuthContext } from '@/context/auth-context'

interface IFormAjaxProps {
  isLoading: boolean
  errorMessage?: string | null
  typeForm?: 'account' | 'password' | null
}

function PageAdmin() {
  const { user } = useAuthContext()
  const [formAjaxProps, setFormAjaxProps] = useState<IFormAjaxProps>({
    isLoading: false,
  })
  const [editFormAccount, setEditFormAccount] = useState<boolean>(false)
  const [editFormPassword, setEditFormPassword] = useState<boolean>(false)

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

  return (
    <AdminLayout heading="Account">
      <Grid container gap={4} className="account-panel">
        <Grid item xs={12} sm={5} className="account-panel__form-box">
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
        </Grid>
        <Grid item xs={12} sm={5} className="account-panel__form-box">
          <Button
            onClick={() => setEditFormPassword(!editFormPassword)}
            className="account-panel__edit-btn"
          >
            Change password
          </Button>
          {editFormPassword ? (
            <ChangePasswordForm
              onSubmit={onSubmitChangePassword}
              isLoading={formAjaxProps.typeForm === 'password' ? true : false}
              validationMessage={
                formAjaxProps.typeForm === 'password'
                  ? formAjaxProps.errorMessage
                  : null
              }
            />
          ) : null}
        </Grid>
      </Grid>
    </AdminLayout>
  )
}

export default PageAdmin
