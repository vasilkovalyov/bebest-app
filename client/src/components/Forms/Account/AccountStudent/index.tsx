// libs
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

//redux
import { useAppSelector, useActions } from '@/redux/hooks'

//hooks
import { useNotification } from '@/hooks/useNotification'

// material ui components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

// relate utils
import { AccountStudentFormValidationSchema } from './AccountStudent.validation'

// other utils
import studentService, { UserAccountInfoEditType } from '@/services/student'
import { AxiosError } from 'axios'

function AccountStudentForm() {
  const { setAuthState } = useActions()
  const user = useAppSelector((state) => state.user.user)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [
    isVisibleNotification,
    messageNotification,
    showNotification,
    closeNotification,
    setMessageNotification,
  ] = useNotification()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserAccountInfoEditType>({
    mode: 'onSubmit',
    defaultValues: {
      name: user.name,
      surname: user.surname,
      phone: user.phone,
      email: user.email,
      about: user.about,
    },
    resolver: yupResolver(AccountStudentFormValidationSchema),
  })

  async function onSubmit(props: UserAccountInfoEditType) {
    if (!user?._id) return
    setIsLoading(true)

    try {
      const response = await studentService.updateUserAccountInfo(
        user?._id,
        props
      )
      setAuthState(response.data)
      showNotification()
      setMessageNotification('Account info has updated')
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log(e.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box>
      <form
        name="form-registration"
        onSubmit={handleSubmit(onSubmit)}
        className="form form-login"
      >
        <Box marginBottom={2}>
          <TextField
            {...register('name')}
            id="name"
            name="name"
            type="name"
            label="Name"
            variant="standard"
            className="form-field"
            fullWidth
            InputLabelProps={{ shrink: true }}
            error={!!errors.name?.message}
            helperText={errors.name?.message}
          />
        </Box>
        <Box marginBottom={2}>
          <TextField
            {...register('surname')}
            id="surname"
            name="surname"
            type="surname"
            label="Surname"
            variant="standard"
            className="form-field"
            fullWidth
            InputLabelProps={{ shrink: true }}
            error={!!errors.surname?.message}
            helperText={errors.surname?.message}
          />
        </Box>
        <Box marginBottom={2}>
          <TextField
            {...register('email')}
            id="email"
            name="email"
            type="email"
            label="Email"
            variant="standard"
            className="form-field"
            fullWidth
            InputLabelProps={{ shrink: true }}
            error={!!errors.email?.message}
            helperText={errors.email?.message}
          />
        </Box>
        <Box marginBottom={2}>
          <TextField
            {...register('phone')}
            id="phone"
            name="phone"
            type="text"
            label="Phone"
            variant="standard"
            className="form-field"
            fullWidth
            InputLabelProps={{ shrink: true }}
            error={!!errors.phone?.message}
            helperText={errors.phone?.message}
          />
        </Box>
        <Box marginBottom={2}>
          <TextField
            {...register('about')}
            id="about"
            name="about"
            type="text"
            label="About"
            variant="standard"
            className="form-field"
            fullWidth
            multiline
            minRows={5}
            InputLabelProps={{ shrink: true }}
            error={!!errors.about?.message}
            helperText={errors.about?.message}
          />
        </Box>
        <Box display="flex" alignItems="center" marginBottom={3}>
          <Button type="submit" variant="contained" disabled={isLoading}>
            Save
          </Button>
          <Box ml={2}>{isLoading ? <CircularProgress size={16} /> : null}</Box>
        </Box>
      </form>
      <Snackbar
        open={isVisibleNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={3000}
        onClose={closeNotification}
      >
        <Alert severity="success">{messageNotification}</Alert>
      </Snackbar>
    </Box>
  )
}

export default AccountStudentForm
