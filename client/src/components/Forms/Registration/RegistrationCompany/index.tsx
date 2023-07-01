// libs
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// hooks
import { useRegistration } from '@/hooks/useRegistration'

// types
import { ICompanyRegistration } from '@/types/company/company'

// material ui components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'

// relate utils
import { IRegistrationCompanyFormProps } from './RegistrationCompany.type'
import { RegistrationFormValidationSchema } from './RegistrationCompany.validation'

function RegistrartionCompanyForm({
  onSuccess,
}: IRegistrationCompanyFormProps) {
  const { loading, messageSuccess, messageValidation, onSubmit } =
    useRegistration<ICompanyRegistration>('company')

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ICompanyRegistration>({
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
      onSubmit={handleSubmit(onSubmit)}
      className="form form-login"
    >
      <Box marginBottom={2}>
        <TextField
          {...register('company_name')}
          id="company_name"
          name="company_name"
          type="text"
          label="Company name"
          variant="standard"
          className="form-field"
          fullWidth
          InputLabelProps={{ shrink: true }}
          error={!!errors.company_name?.message}
          helperText={errors.company_name?.message}
        />
      </Box>
      <Box marginBottom={2}>
        <TextField
          {...register('admin_name')}
          id="admin_name"
          name="admin_name"
          type="text"
          label="Admin name"
          variant="standard"
          className="form-field"
          fullWidth
          InputLabelProps={{ shrink: true }}
          error={!!errors.admin_name?.message}
          helperText={errors.admin_name?.message}
        />
      </Box>
      <Box marginBottom={2}>
        <TextField
          {...register('admin_surname')}
          id="admin_surname"
          name="admin_surname"
          type="text"
          label="Admin surname"
          variant="standard"
          className="form-field"
          fullWidth
          InputLabelProps={{ shrink: true }}
          error={!!errors.admin_surname?.message}
          helperText={errors.admin_surname?.message}
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
        >
          Registration
        </Button>
        <Box ml={2}>{loading ? <CircularProgress size={16} /> : null}</Box>
      </Box>
    </form>
  )
}

export default RegistrartionCompanyForm
