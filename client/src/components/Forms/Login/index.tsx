import { useState } from 'react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

import ContainerWithShadow from '@/components/Generic/ContainerWithShadow'
import Icon from '@/components/Generic/Icon'

import { IconEnum } from '@/components/Generic/Icon/Icon.type'

import { ILoginFormProps } from './Login.type'
import { LoginFormValidationSchema } from './Login.validation'
import { ILogin } from './Login.service'

function LoginForm({
  onSubmit,
  isLoading,
  validationMessage,
}: ILoginFormProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ILogin>({
    mode: 'onSubmit',
    resolver: yupResolver(LoginFormValidationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
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
        {validationMessage && (
          <Box marginBottom={2}>
            <Typography variant="body2" className="MuiTypography">
              {validationMessage}
            </Typography>
          </Box>
        )}
        <Box display="flex" alignItems="center">
          <Button type="submit" variant="contained" disabled={isLoading}>
            Sign in
          </Button>
          <Box ml={2}>{isLoading ? <CircularProgress size={16} /> : null}</Box>
        </Box>
      </form>
    </ContainerWithShadow>
  )
}

export default LoginForm
