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
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'

//custom components
import UploadAvatar from '@/components/Uploaders/UploadAvatar'

// relate utils
import { AccountStudentFormValidationSchema } from './AccountStudent.validation'
import { fields } from './AccountStudent.utils'

// other utils
import studentService from '@/services/student'
import { useLoadUserInfo } from '@/hooks/useLoadUserInfo'
import uploadFileService from '@/services/upload-file'
import { IStudentAccountFormFields } from '@/types/student/student'

function AccountStudentForm({ onHandleClose }: { onHandleClose: () => void }) {
  const user = useAppSelector((state) => state.student.user)
  const { loadUserInfo } = useLoadUserInfo()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoadingUpload, setIsLoadingUpload] = useState<boolean>(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IStudentAccountFormFields>({
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

  async function onSubmit(props: IStudentAccountFormFields) {
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

  function onChangeUploadAvatar(imageStr: string) {
    setSelectedImage(imageStr)
  }

  async function uploadUserAvatar() {
    if (!selectedImage) return
    setIsLoadingUpload(true)
    try {
      await uploadFileService.uploadUserAvatar('student', selectedImage)
      loadUserInfo('student')
      onHandleClose()
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoadingUpload(false)
    }
  }

  return (
    <Box>
      <form
        name="form-registration"
        onSubmit={handleSubmit(onSubmit)}
        className="form form-login"
      >
        <Grid container spacing={4}>
          <Grid item md={3}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <UploadAvatar
                image={selectedImage || user.avatar}
                onChange={onChangeUploadAvatar}
              />
              {selectedImage ? (
                <Box marginTop={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="small"
                    disabled={isLoadingUpload}
                    onClick={uploadUserAvatar}
                  >
                    {isLoadingUpload ? 'Uploading...' : 'Save avatar'}
                  </Button>
                </Box>
              ) : null}
            </Box>
          </Grid>
          <Grid item md={6}>
            {fields.map(({ name, label, disabled, textarea }) => (
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
                  disabled={disabled}
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
              <Box ml={2}>
                {isLoading ? <CircularProgress size={16} /> : null}
              </Box>
              <Button variant="outlined" size="small" onClick={onHandleClose}>
                Close
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

export default AccountStudentForm
