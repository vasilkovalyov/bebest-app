// libs
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// hooks
import { useLogin } from './useLogin'

// types
import { IconEnum } from '@/types/icons'

// material ui components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'
import CircularProgress from '@mui/material/CircularProgress'

// custom components
import Icon from '@/components/Generic/Icon'
import ContainerWithShadow from '@/components/Generic/ContainerWithShadow'

// relate utils
import { ILogin } from './Login.type'
import { LoginFormValidationSchema } from './Login.validation'

function LoginForm() {
  const { loading, messageValidation, onSubmit } = useLogin()
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ILogin>({
    mode: 'onSubmit',
    resolver: yupResolver(LoginFormValidationSchema),
  })

  return (
    <ContainerWithShadow className="container--login">
      <form
        name="form-login"
        onSubmit={handleSubmit(onSubmit)}
        className="form form-login"
      >
        <Box marginBottom={2}>
          <TextField
            {...register('email')}
            id="email"
            name="email"
            type="email"
            label="Email"
            variant="standard"
            className="form-field"
            autoComplete="off"
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
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  onClick={() => setShowPassword((show) => !show)}
                >
                  <Icon
                    size={20}
                    icon={
                      showPassword ? IconEnum.EYE_ACCESS : IconEnum.EYE_DENIED
                    }
                  />
                </InputAdornment>
              ),
            }}
            error={!!errors.password?.message}
            helperText={errors.password?.message}
          />
        </Box>
        {messageValidation && (
          <Box marginBottom={2}>
            <Typography variant="body2" color="danger" textAlign="center">
              {messageValidation}
            </Typography>
          </Box>
        )}
        <Box display="flex" alignItems="center" justifyContent="center">
          <Button
            type="submit"
            variant="contained"
            size="small"
            disabled={loading}
          >
            Sign in
          </Button>
          <Box ml={2}>{loading ? <CircularProgress size={16} /> : null}</Box>
        </Box>
      </form>
    </ContainerWithShadow>
  )
}

export default LoginForm
