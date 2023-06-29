// libs
import { useEffect, useState } from 'react'
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
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'

//custom components
import { IconEnum } from '@/types/icons'
import Icon from '@/components/Generic/Icon'
import WarningIcon from '@/components/Generic/WarningIcon'

// relate utils
import {
  ITeacherWorkExperienceInfo,
  ITeacherWorkExperienceFormProps,
} from './TeacherWorkExperience.type'
import { TeacherWorkExperienceFormValidationSchema } from './TeacherWorkExperience.validation'

// other utils
import colors from '@/constants/colors'
import { Stack } from '@mui/material'
import teacherWorkExperienceService from '@/services/teacher-work-experience'
import { useLoadUserInfo } from '@/hooks/useLoadUserInfo'
import { IWorkExperience } from '@/types/common'

const defaultWorkExperience: IWorkExperience = {
  company_name: '',
  description: '',
  startDate: '',
  endDate: '',
  isStillWorking: false,
}

const defaultInitialData: ITeacherWorkExperienceInfo = {
  work_experience: [defaultWorkExperience],
}

function TeacherWorkExperienceForm({
  onHandleClose,
}: ITeacherWorkExperienceFormProps) {
  const workExperienceStore = useAppSelector(
    (store) => store.teacherPersonalInfo.work_experience
  )
  const dispatch = useDispatch<any>()
  const { loadUserInfo } = useLoadUserInfo()

  const [checkboxArr, setCheckboxArr] = useState<boolean[]>([])

  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [selectRemoveWorkExperienceId, setSelectRemoveWorkExperienceId] =
    useState<{
      id: string
      index: number
    }>({
      id: '',
      index: -1,
    })

  const defaultFields = workExperienceStore.length
    ? defaultInitialData.work_experience
    : []

  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    control,
    trigger,
    formState: { errors },
  } = useForm<ITeacherWorkExperienceInfo>({
    mode: 'onSubmit',
    defaultValues: {
      work_experience: [...(workExperienceStore || []), ...defaultFields],
    },
    resolver: yupResolver(TeacherWorkExperienceFormValidationSchema),
  })

  const { fields, remove, append } = useFieldArray({
    control,
    name: 'work_experience',
  })

  useEffect(() => {
    const checkedArr = workExperienceStore.map((item) => item.isStillWorking)
    setCheckboxArr([...checkedArr, false])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleAddWorkExperience(data: ITeacherWorkExperienceInfo) {
    try {
      const workExperience = {
        ...data.work_experience[data.work_experience.length - 1],
      }
      await teacherWorkExperienceService.addWorkExperience(workExperience)
      dispatch(fetchTeacherPersonalInfo())
      loadUserInfo('teacher')
      append(defaultWorkExperience)
    } catch (e) {
      console.log(e)
    }
  }

  function handleOpenModal(id: string, index: number) {
    setSelectRemoveWorkExperienceId({
      id,
      index,
    })
    setModalOpen(true)
  }

  async function handleRemoveWorkExperience() {
    try {
      await teacherWorkExperienceService.removeWorkExperience(
        selectRemoveWorkExperienceId.id
      )

      dispatch(fetchTeacherPersonalInfo())
      loadUserInfo('teacher')
      remove(selectRemoveWorkExperienceId.index)
      setSelectRemoveWorkExperienceId({
        id: '',
        index: -1,
      })
      handleCloseModal()
    } catch (e) {
      console.log(e)
    }
  }

  function handleCloseModal() {
    setModalOpen(false)
  }

  function onChangeStillWorkingCheckbox(index: number) {
    const checkedArr = checkboxArr.map((item, key) => {
      if (key === index) {
        return !checkboxArr[key]
      }
      return item
    })
    setCheckboxArr(checkedArr)
    trigger([`work_experience.${index}.endDate`])
    setValue(
      `work_experience.${index}.isStillWorking`,
      !getValues().work_experience[index].isStillWorking
    )
  }

  function handleAddFormWorkExperience() {
    setValue('work_experience', [defaultWorkExperience])
  }

  return (
    <Box>
      <form className="form">
        {getValues().work_experience.length ? (
          <Box>
            {fields.map(({ id, _id }, index) => (
              <Box key={id}>
                <Box maxWidth={500}>
                  <Box marginBottom={2}>
                    <TextField
                      {...register(`work_experience.${index}.company_name`)}
                      id={`work_experience-${index}-company_name`}
                      type="text"
                      label="Company name"
                      variant="standard"
                      className="form-field"
                      placeholder="Company name"
                      fullWidth
                      disabled={fields.length - 1 > index}
                      InputLabelProps={{ shrink: true }}
                      error={
                        !!errors.work_experience?.[index]?.company_name?.message
                      }
                      helperText={
                        errors.work_experience?.[index]?.company_name?.message
                      }
                    />
                  </Box>
                  <Box marginBottom={2}>
                    <TextField
                      {...register(`work_experience.${index}.description`)}
                      id={`work_experience-${index}-description`}
                      type="text"
                      label="Description"
                      variant="standard"
                      className="form-field"
                      placeholder="Description"
                      fullWidth
                      multiline
                      minRows={4}
                      disabled={fields.length - 1 > index}
                      InputLabelProps={{ shrink: true }}
                      error={
                        !!errors.work_experience?.[index]?.description?.message
                      }
                      helperText={
                        errors.work_experience?.[index]?.description?.message
                      }
                    />
                  </Box>
                  <Stack
                    marginBottom={2}
                    direction="row"
                    gap={2}
                    alignItems="flex-end"
                  >
                    <TextField
                      {...register(`work_experience.${index}.startDate`)}
                      id={`work_experience-${index}-startDate`}
                      type="date"
                      label="Date start"
                      variant="standard"
                      className="form-field"
                      disabled={fields.length - 1 > index}
                      InputLabelProps={{ shrink: true }}
                      error={
                        !!errors.work_experience?.[index]?.startDate?.message
                      }
                      helperText={
                        errors.work_experience?.[index]?.startDate?.message
                      }
                    />
                    <TextField
                      {...register(`work_experience.${index}.endDate`)}
                      id={`work_experience-${index}-endDate`}
                      type="date"
                      label="Date end"
                      variant="standard"
                      className="form-field"
                      disabled={
                        fields.length - 1 > index ||
                        getValues().work_experience[index].isStillWorking
                      }
                      InputLabelProps={{ shrink: true }}
                      error={
                        !getValues().work_experience[index].isStillWorking &&
                        !!errors.work_experience?.[index]?.endDate?.message
                      }
                      helperText={
                        !getValues().work_experience[index].isStillWorking &&
                        errors.work_experience?.[index]?.endDate?.message
                      }
                    />
                    <FormControlLabel
                      label="Still working"
                      disabled={fields.length - 1 > index}
                      control={
                        <Checkbox
                          {...register(
                            `work_experience.${index}.isStillWorking`
                          )}
                          onChange={() => onChangeStillWorkingCheckbox(index)}
                          checked={checkboxArr[index] ? true : false}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                      }
                    />
                  </Stack>
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
                  onClick={handleSubmit(handleAddWorkExperience)}
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
                    Add work experience
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
            onClick={handleAddFormWorkExperience}
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
              Add work experience
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
              Do you really want to remove work experience?
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
                onClick={handleRemoveWorkExperience}
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

export default TeacherWorkExperienceForm
