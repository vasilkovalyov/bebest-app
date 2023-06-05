// libs
import { useState } from 'react'
import { AxiosError } from 'axios'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

//redux
import { useAppSelector } from '@/redux/hooks'

// material ui components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress'

// relate utils
import { AccountStudentFormValidationSchema } from './AccountStudent.validation'

// other utils
import studentService, { UserAccountInfoEditType } from '@/services/student'
import { useLoadUserInfo } from '@/hooks/useLoadUserInfo'

const fields: Readonly<
  {
    name: keyof UserAccountInfoEditType
    label: string
    textarea?: boolean
  }[]
> = [
  {
    name: 'name',
    label: 'Name',
  },
  {
    name: 'surname',
    label: 'Surname',
  },
  {
    name: 'email',
    label: 'Email',
  },
  {
    name: 'phone',
    label: 'Phone',
  },
  {
    name: 'about',
    label: 'About',
    textarea: true,
  },
]

function AccountStudentForm({ onHandleClose }: { onHandleClose: () => void }) {
  const user = useAppSelector((state) => state.user.user)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { loadUserInfo } = useLoadUserInfo()

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
    setIsLoading(true)

    try {
      await studentService.updateUserAccountInfo(props)
      loadUserInfo('student')
      onHandleClose()
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
        {fields.map(({ name, label, textarea }) => (
          <Box key={name} marginBottom={2}>
            <TextField
              {...register(name)}
              id={name}
              name={name}
              type="text"
              label={label}
              variant="standard"
              className="form-field"
              fullWidth
              {...(textarea && { multiline: true, minRows: 5 })}
              InputLabelProps={{ shrink: true }}
              error={!!errors[name]?.message}
              helperText={errors[name]?.message}
            />
          </Box>
        ))}
        <Box display="flex" alignItems="center" marginBottom={3}>
          <Button
            type="submit"
            variant="contained"
            size="small"
            disabled={isLoading}
          >
            Save
          </Button>
          <Box ml={2}>{isLoading ? <CircularProgress size={16} /> : null}</Box>
          <Button variant="outlined" size="small" onClick={onHandleClose}>
            Close
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default AccountStudentForm
