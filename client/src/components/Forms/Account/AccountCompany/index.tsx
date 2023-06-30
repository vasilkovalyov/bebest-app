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
import { AccountCompanyFormValidationSchema } from './AccountCompany.validation'
import { fields } from './AccountCompany.utils'

// other utils
import { useLoadUserInfo } from '@/hooks/useLoadUserInfo'
import companyService from '@/services/company'
import uploadFileService from '@/services/upload-file'
import { ICompanyAccountFormFields } from '@/types/company/company'

function AccountCompanyForm({ onHandleClose }: { onHandleClose: () => void }) {
  const user = useAppSelector((state) => state.company.user)
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
  } = useForm<ICompanyAccountFormFields>({
    mode: 'onSubmit',
    defaultValues: {
      company_name: user.company_name,
      admin_name: user.admin_name,
      admin_surname: user.admin_surname,
      phone: user.phone,
      email: user.email,
      about: user.about,
    },
    resolver: yupResolver(AccountCompanyFormValidationSchema),
  })

  async function onSubmit(props: ICompanyAccountFormFields) {
    setIsLoading(true)
    try {
      await companyService.updateAccountInfo({
        ...props,
      })
      loadUserInfo('company')
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
      await uploadFileService.uploadUserAvatar('company', selectedImage)
      loadUserInfo('company')
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

export default AccountCompanyForm
