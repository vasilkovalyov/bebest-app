// libs
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { AxiosError } from 'axios'

//redux
import { useActions } from '@/redux/hooks'

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

// other utils
import { IconEnum } from '@/types/icons'
import studentService from '@/services/student'
import teacherService from '@/services/teacher'
import companyService from '@/services/company'
import pages from '@/constants/pages'
import { loginUser } from '@/components/Forms/Login/Login.service'

// relate utils
import { ILogin } from './Login.type'
import { LoginFormValidationSchema } from './Login.validation'

function LoginForm() {
  const router = useRouter()
  const { setAuthState, setStudentState, setTeacherState, setCompanyState } =
    useActions()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ILogin>({
    mode: 'onSubmit',
    resolver: yupResolver(LoginFormValidationSchema),
  })

  async function onSubmit({ email, password }: ILogin) {
    try {
      setIsLoading(true)
      const loginResponse = await loginUser(email, password)
      if (loginResponse.status === 200) {
        setErrorMessage(null)
      }

      const { role, token, userId } = loginResponse.data

      router.push(pages.cabinet).then(() => {
        if (role === 'student') {
          studentService.getAccountInfo().then((userResponse) => {
            setAuthState({
              _id: userResponse.data._id,
              name: userResponse.data.name,
              surname: userResponse.data.surname,
              avatar: userResponse.data.avatar,
              role: userResponse.data.role,
            })
            setStudentState(userResponse.data)
          })
        }
        if (role === 'teacher') {
          teacherService.getAccountInfo().then((userResponse) => {
            setAuthState({
              _id: userResponse.data._id,
              name: userResponse.data.name,
              surname: userResponse.data.surname,
              avatar: userResponse.data.avatar,
              role: userResponse.data.role,
            })
            setTeacherState(userResponse.data)
          })
        }
        if (role === 'company') {
          companyService.getAccountInfo().then((userResponse) => {
            setAuthState({
              _id: userResponse.data._id,
              name: userResponse.data.admin_name,
              surname: userResponse.data.admin_surname,
              avatar: userResponse.data.avatar,
              role: userResponse.data.role,
            })
            setCompanyState(userResponse.data)
          })
        }

        setIsLoading(false)
      })
    } catch (e) {
      if (e instanceof AxiosError) {
        setErrorMessage(e.response?.data.error)
      }
      setIsLoading(false)
    }
  }

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
        {errorMessage && (
          <Box marginBottom={2}>
            <Typography variant="body2" color="danger" textAlign="center">
              {errorMessage}
            </Typography>
          </Box>
        )}
        <Box display="flex" alignItems="center" justifyContent="center">
          <Button
            type="submit"
            variant="contained"
            size="small"
            disabled={isLoading}
          >
            Sign in
          </Button>
          <Box ml={2}>{isLoading ? <CircularProgress size={16} /> : null}</Box>
        </Box>
      </form>
    </ContainerWithShadow>
  )
}

export default LoginForm
