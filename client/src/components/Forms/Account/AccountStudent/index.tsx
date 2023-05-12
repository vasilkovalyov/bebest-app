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
  IAccountStudentFormProps,
  IAccountStudent,
} from './AccountStudent.type'
import { AccountStudentFormValidationSchema } from './AccountStudent.validation'

function AccountStudentForm({
  initialData,
  onSubmit,
  isLoading,
  validationMessage,
}: IAccountStudentFormProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IAccountStudent>({
    mode: 'onSubmit',
    defaultValues: initialData,
    resolver: yupResolver(AccountStudentFormValidationSchema),
  })

  return (
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
      {validationMessage && (
        <Box marginBottom={2}>
          <Typography variant="body2" className="MuiTypography">
            {validationMessage}
          </Typography>
        </Box>
      )}
      <Box display="flex" alignItems="center" marginBottom={3}>
        <Button type="submit" variant="contained" disabled={isLoading}>
          Save
        </Button>
        <Box ml={2}>{isLoading ? <CircularProgress size={16} /> : null}</Box>
      </Box>
    </form>
  )
}

export default AccountStudentForm
