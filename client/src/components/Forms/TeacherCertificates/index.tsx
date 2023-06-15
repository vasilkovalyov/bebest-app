// libs
import { ChangeEvent, useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, useFieldArray } from 'react-hook-form'

//redux
import { useAppSelector } from '@/redux/hooks'
import { useDispatch } from 'react-redux'
import { fetchTeacherPersonalInfo } from '@/redux/slices/teacher-personal-info'

// material ui components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'

//custom components
import { IconEnum } from '@/components/Generic/Icon/Icon.type'
import Icon from '@/components/Generic/Icon'
import WarningIcon from '@/components/Generic/WarningIcon'
import UploadImage from '@/components/Uploaders/UploadImage'

// relate utils
import {
  ITeacherСertificates,
  ITeacherСertificatesFormProps,
} from './TeacherCertificates.type'
import { TeacherCertificatesFormValidationSchema } from './TeacherCertificates.type.validation'

// other utils
import colors from '@/constants/colors'

import { IUserСertificate } from '@/services/teacher-certificates'
import teacherСertificatesService from '@/services/teacher-certificates'
import { useLoadUserInfo } from '@/hooks/useLoadUserInfo'

const defaultCertificate: IUserСertificate = {
  name: '',
  date: '',
  image: null,
}

const defaultInitialData: ITeacherСertificates = {
  certificates: [defaultCertificate],
}

function TeacherCertificates({ onHandleClose }: ITeacherСertificatesFormProps) {
  const certificatesStore = useAppSelector(
    (store) => store.teacherPersonalInfo.certificates
  )
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const dispatch = useDispatch<any>()
  const { loadUserInfo } = useLoadUserInfo()

  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [selectRemoveCertificateId, setSelectRemoveCertificateId] = useState<{
    id: string
    index: number
  }>({
    id: '',
    index: -1,
  })

  const defaultFields = certificatesStore.length
    ? defaultInitialData.certificates
    : []

  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    control,
    trigger,
    formState: { errors },
  } = useForm<ITeacherСertificates>({
    mode: 'onSubmit',
    defaultValues: {
      certificates: [...(certificatesStore || []), ...defaultFields],
    },
    resolver: yupResolver(TeacherCertificatesFormValidationSchema),
  })

  const { fields, remove, append } = useFieldArray({
    control,
    name: 'certificates',
  })

  async function handleAddCertificate(data: ITeacherСertificates) {
    setIsLoading(true)
    try {
      const certificates = {
        ...data.certificates[data.certificates.length - 1],
      }
      await teacherСertificatesService.addCertificate(certificates)
      dispatch(fetchTeacherPersonalInfo())
      append(defaultCertificate)
    } catch (e) {
      console.log(e)
      setIsLoading(false)
    }
  }

  async function handleRemoveCertificate() {
    setIsLoading(true)
    try {
      await teacherСertificatesService.removeCertificate(
        selectRemoveCertificateId.id
      )

      dispatch(fetchTeacherPersonalInfo())
      loadUserInfo('teacher')
      remove(selectRemoveCertificateId.index)
      setSelectRemoveCertificateId({
        id: '',
        index: -1,
      })
      handleCloseModal()
    } catch (e) {
      console.log(e)
      setIsLoading(false)
    }
  }

  function onChangeUploadCertificate(imageStr: string, index: number) {
    setValue(`certificates.${index}.image`, imageStr)
    trigger([`certificates.${index}.image`])
  }

  function handleCloseModal() {
    setModalOpen(false)
  }

  function handleOpenModal(id: string, index: number) {
    setSelectRemoveCertificateId({
      id,
      index,
    })
    setModalOpen(true)
  }

  function handleAddFormCertificate() {
    setValue('certificates', [defaultCertificate])
  }

  return (
    <Box>
      <form className="form">
        {getValues().certificates.length ? (
          <Box>
            {fields.map(({ id, _id }, index) => (
              <Box key={id}>
                <Box marginBottom={2}>
                  <TextField
                    {...register(`certificates.${index}.name`)}
                    id={`certificates-${index}-company_name`}
                    type="text"
                    label="Name of the certificate"
                    variant="standard"
                    className="form-field"
                    placeholder="Name of the certificate"
                    fullWidth
                    disabled={fields.length - 1 > index}
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.certificates?.[index]?.name?.message}
                    helperText={errors.certificates?.[index]?.name?.message}
                  />
                </Box>
                <Box marginBottom={2}>
                  <TextField
                    {...register(`certificates.${index}.date`)}
                    id={`certificates-${index}-date`}
                    type="date"
                    label="Date of receiving"
                    variant="standard"
                    className="form-field"
                    placeholder="Date of receiving"
                    fullWidth
                    minRows={4}
                    disabled={fields.length - 1 > index}
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.certificates?.[index]?.date?.message}
                    helperText={errors.certificates?.[index]?.date?.message}
                  />
                </Box>
                <Box maxWidth={200} marginBottom={2}>
                  <UploadImage
                    disabled={fields.length - 1 > index}
                    image={getValues().certificates[index].image || null}
                    onChange={(value) =>
                      onChangeUploadCertificate(value, index)
                    }
                  />
                  {errors.certificates?.[index]?.image ? (
                    <Typography
                      variant="caption"
                      style={{ color: '#d32f2f', fontSize: '13px' }}
                    >
                      {errors.certificates?.[index]?.image?.message}
                    </Typography>
                  ) : null}
                  <input
                    {...register(`certificates.${index}.image`)}
                    type="file"
                    hidden
                  />
                </Box>

                {fields.length - 1 > index ? (
                  <>
                    <Button
                      type="button"
                      size="small"
                      onClick={() => handleOpenModal(_id || '', index)}
                    >
                      <Box
                        component="span"
                        marginRight={1}
                        display="inline-block"
                        style={{
                          verticalAlign: 'middle',
                        }}
                      >
                        <Icon
                          icon={IconEnum.BIN}
                          color={colors.primary}
                          size={16}
                        />
                      </Box>
                      <Box
                        component="span"
                        display="inline-block"
                        style={{
                          verticalAlign: 'middle',
                          paddingTop: 4,
                        }}
                      >
                        Remove
                      </Box>
                    </Button>
                    <Box marginTop={1} marginBottom={4}>
                      <Divider />
                    </Box>
                  </>
                ) : null}
              </Box>
            ))}
            <Box
              display="flex"
              alignItems="center"
              marginBottom={3}
              maxWidth={400}
            >
              <Stack direction="row" gap={2}>
                <Button
                  type="submit"
                  variant="outlined"
                  size="small"
                  disabled={isLoading}
                  onClick={handleSubmit(handleAddCertificate)}
                >
                  <Box
                    component="span"
                    marginRight={1}
                    display="inline-block"
                    style={{
                      verticalAlign: 'middle',
                    }}
                  >
                    <Icon
                      icon={IconEnum.PLUS}
                      color={colors.primary}
                      size={16}
                    />
                  </Box>
                  <Box
                    component="span"
                    display="inline-block"
                    style={{
                      verticalAlign: 'middle',
                      paddingTop: 2,
                    }}
                  >
                    Add certificate
                  </Box>
                  <Box ml={2}>
                    {isLoading ? <CircularProgress size={16} /> : null}
                  </Box>
                </Button>
                <Button variant="outlined" size="small" onClick={onHandleClose}>
                  Close
                </Button>
              </Stack>
            </Box>
          </Box>
        ) : (
          <Button
            type="submit"
            variant="contained"
            size="small"
            onClick={handleAddFormCertificate}
          >
            <Box
              component="span"
              marginRight={1}
              display="inline-block"
              style={{
                verticalAlign: 'middle',
              }}
            >
              <Icon icon={IconEnum.PLUS} color={colors.white} size={16} />
            </Box>
            <Box
              component="span"
              display="inline-block"
              style={{
                verticalAlign: 'middle',
                paddingTop: 2,
              }}
            >
              Add certificate
            </Box>
          </Button>
        )}
      </form>
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box className="modal-box">
          <Button className="modal-box__button-close" onClick={onHandleClose}>
            <Icon
              icon={IconEnum.CROSS_OUTLINE}
              size={20}
              color="#000000"
              className="modal-box__button-close-icon"
            />
          </Button>
          <Box className="modal-box__inner">
            <Box textAlign="center" marginBottom={2}>
              <WarningIcon />
            </Box>
            <Typography variant="h4" className="ta-c" marginBottom={2}>
              Do you really want to remove certificate?
            </Typography>
            <Stack
              direction="row"
              justifyContent="center"
              marginTop={2}
              marginBottom={2}
              spacing={3}
            >
              <Button
                variant="contained"
                size="small"
                onClick={handleCloseModal}
              >
                decline
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={handleRemoveCertificate}
              >
                accept
              </Button>
            </Stack>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}

export default TeacherCertificates
