// libs
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// hooks
import { useRegistration } from '@/hooks/useRegistration'

// types
import { IStudentRegistration } from '@/types/student/student'

// material ui components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'

// relate utils
import { IRegistrationStudentFormProps } from './RegistrationStudent.type'
import { RegistrationFormValidationSchema } from './RegistrationStudent.validation'

function RegistrartionStudentForm({
  onSuccess,
}: IRegistrationStudentFormProps) {
  const { loading, messageSuccess, messageValidation, onSubmit } =
    useRegistration<IStudentRegistration>('student')
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IStudentRegistration>({
    mode: 'onSubmit',
    resolver: yupResolver(RegistrationFormValidationSchema),
  })

  useEffect(() => {
    if (messageSuccess) {
      onSuccess && onSuccess(messageSuccess)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageSuccess])

  return (
    <form
      name="form-registration"
      onSubmit={handleSubmit((props) => onSubmit(props))}
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
          data-cy="name"
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
          data-cy="surname"
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
          data-cy="email"
        />
      </Box>
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
          data-cy="password"
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
          data-cy="confirm_password"
        />
      </Box>
      {messageValidation && (
        <Box marginBottom={2}>
          <Typography variant="body2">{messageValidation}</Typography>
        </Box>
      )}
      <Box display="flex" alignItems="center" justifyContent="center">
        <Button
          type="submit"
          variant="contained"
          size="small"
          disabled={loading}
          data-cy="submit-registration"
        >
          Registration
        </Button>
        <Box ml={2}>{loading ? <CircularProgress size={16} /> : null}</Box>
      </Box>
    </form>
  )
}

export default RegistrartionStudentForm
