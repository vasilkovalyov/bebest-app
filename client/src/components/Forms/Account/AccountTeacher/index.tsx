// libs
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { AxiosError } from 'axios'

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
import UploadVideo from '@/components/Uploaders/UploadVideo'

// relate utils
import { AccountTeacherFormValidationSchema } from './AccountTeacher.validation'
import { fields } from './AccountTeacher.utils'

// other utils
import { useLoadUserInfo } from '@/hooks/useLoadUserInfo'
import teacherService from '@/services/teacher'
import uploadFileService from '@/services/upload-file'
import { ITeacherAccountFormFields } from '@/types/teacher/teacher'

function AccountTeacherForm({ onHandleClose }: { onHandleClose: () => void }) {
  const user = useAppSelector((state) => state.teacher.user)
  const { loadUserInfo } = useLoadUserInfo()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoadingUpload, setIsLoadingUpload] = useState<boolean>(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const {
    handleSubmit,
    register,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<ITeacherAccountFormFields>({
    mode: 'onSubmit',
    defaultValues: {
      name: user.name,
      surname: user.surname,
      phone: user.phone,
      email: user.email,
      about: user.about,
      video: user.video?.url && null,
    },
    resolver: yupResolver(AccountTeacherFormValidationSchema),
  })

  useEffect(() => {
    if (user.video) {
      setValue('video', user.video.url)
      trigger(['video'])
    }
  }, [])

  async function onSubmit(props: ITeacherAccountFormFields) {
    setIsLoading(true)
    try {
      await teacherService.updateUserAccountInfo({
        ...props,
        video: props.video,
      })
      loadUserInfo('teacher')
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

  function onChangeUploadVideo(videoFile: FileList) {
    setValue('video', videoFile[0])
    trigger('video')
  }

  async function uploadUserAvatar() {
    if (!selectedImage) return
    setIsLoadingUpload(true)
    try {
      await uploadFileService.uploadUserAvatar('teacher', selectedImage)
      loadUserInfo('teacher')
      onHandleClose()
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoadingUpload(false)
    }
  }

  return (
    <Box>
      <form name="form-registration" className="form form-login">
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
                  disabled={disabled}
                  fullWidth
                  {...(textarea && { multiline: true, minRows: 5 })}
                  InputLabelProps={{ shrink: true }}
                  error={!!errors[name]?.message}
                  helperText={errors[name]?.message}
                />
              </Box>
            ))}
            <Box marginBottom={2}>
              <UploadVideo
                video={user.video ? user.video.url : null}
                onChange={onChangeUploadVideo}
              />
              <input {...register('video')} type="file" hidden />
            </Box>
            <Box display="flex" alignItems="center" marginBottom={3}>
              <Button
                type="submit"
                variant="contained"
                size="small"
                disabled={isLoading}
                onClick={handleSubmit(onSubmit)}
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

export default AccountTeacherForm
