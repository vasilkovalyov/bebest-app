// libs
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

//redux
import { useAppSelector } from '@/redux/hooks'

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
import { IChangePassword } from './ChangePassword.type'
import { PasswordChangeFormValidationSchema } from './ChangePassword.validation'

// other utils
import studentService from '@/services/student'
import teacherService from '@/services/teacher'
import { AxiosError } from 'axios'

function ChangePasswordForm() {
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
    reset,
    formState: { errors },
  } = useForm<IChangePassword>({
    mode: 'onSubmit',
    resolver: yupResolver(PasswordChangeFormValidationSchema),
  })

  useEffect(() => {
    if (!isLoading) {
      reset({
        password: '',
        confirm_password: '',
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  async function onSubmit(props: IChangePassword) {
    if (!user?._id) return

    try {
      setIsLoading(true)

      let response: unknown | any

      if (user.role === 'student') {
        response = await studentService.changePassword(props.confirm_password)
      }

      if (user.role === 'teacher') {
        response = await teacherService.changePassword(props.confirm_password)
      }

      if (response.status === 200) {
        showNotification()
        setMessageNotification(response.data.message)
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log(e.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box paddingY={4} maxWidth={400}>
      <form
        name="form-registration"
        onSubmit={handleSubmit(onSubmit)}
        className="form form-login"
      >
        <Box marginBottom={2}>
          <TextField
            {...register('password')}
            id="password"
            name="password"
            type="password"
            label="Password"
            variant="standard"
            className="form-field"
            autoComplete="off"
            fullWidth
            InputLabelProps={{ shrink: true }}
            error={!!errors.password?.message}
            helperText={errors.password?.message}
          />
        </Box>
        <Box marginBottom={2}>
          <TextField
            {...register('confirm_password')}
            id="confirm_password"
            name="confirm_password"
            type="password"
            label="Confirm password"
            variant="standard"
            className="form-field"
            autoComplete="off"
            fullWidth
            InputLabelProps={{ shrink: true }}
            error={!!errors.confirm_password?.message}
            helperText={errors.confirm_password?.message}
          />
        </Box>
        <Box display="flex" alignItems="center">
          <Button type="submit" variant="contained" disabled={isLoading}>
            Change password
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

export default ChangePasswordForm
