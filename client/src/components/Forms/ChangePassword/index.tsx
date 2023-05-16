// libs
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// material ui components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'

// relate utils
import {
  IChangePasswordFormProps,
  IChangePassword,
} from './ChangePassword.type'
import { PasswordChangeFormValidationSchema } from './ChangePassword.validation'
import { useEffect } from 'react'

function ChangePasswordForm({
  isLoading,
  onSubmit,
  validationMessage,
}: IChangePasswordFormProps) {
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

  return (
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
          fullWidth
          InputLabelProps={{ shrink: true }}
          error={!!errors.confirm_password?.message}
          helperText={errors.confirm_password?.message}
        />
      </Box>
      {validationMessage && (
        <Box marginBottom={2}>
          <Typography variant="body2">{validationMessage}</Typography>
        </Box>
      )}
      <Box display="flex" alignItems="center">
        <Button type="submit" variant="contained" disabled={isLoading}>
          Change password
        </Button>
        <Box ml={2}>{isLoading ? <CircularProgress size={16} /> : null}</Box>
      </Box>
    </form>
  )
}

export default ChangePasswordForm
