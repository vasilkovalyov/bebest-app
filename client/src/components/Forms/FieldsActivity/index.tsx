// libs
import { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'

// material ui components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'

//custom components
import { IconEnum } from '@/components/Generic/Icon/Icon.type'
import Icon from '@/components/Generic/Icon'
import WarningIcon from '@/components/Generic/WarningIcon'

// relate utils
import {
  IFieldsActivityInfo,
  IFieldsActivityFormProps,
} from './FieldsActivity.type'

// other utils
import colors from '@/constants/colors'
import { Stack } from '@mui/material'
// import studentSubjectsService from '@/services/student-subjects'
import { IFieldActivity } from '@/services/fields-activity'

const defaultWorkExperience: IFieldActivity = {
  activity: '',
  skills: '',
}

const defaultInitialData: IFieldsActivityInfo = {
  fields_activity: [defaultWorkExperience],
}

function FieldsActivityForm({
  initialData,
  onHandleClose,
  onHandleUpdate,
}: IFieldsActivityFormProps) {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [selectRemoveWorkExperienceId, setSelectRemoveWorkExperienceId] =
    useState<{
      id: string
      index: number
    }>({
      id: '',
      index: -1,
    })

  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    control,
    trigger,
    formState: { errors },
  } = useForm<IFieldsActivityInfo>({
    mode: 'onSubmit',
    defaultValues: {
      fields_activity: [
        ...(initialData?.fields_activity || []),
        ...defaultInitialData.fields_activity,
      ],
    },
  })

  const { fields, remove, append } = useFieldArray({
    control,
    name: 'fields_activity',
  })

  async function handleAddFieldActivity(data: IFieldsActivityInfo) {
    try {
      const fieldsActivity = {
        ...data.fields_activity[data.fields_activity.length - 1],
      }
      // await studentSubjectsService.addSubject(workExperience)

      append(defaultWorkExperience)

      onHandleUpdate()
    } catch (e) {
      console.log(e)
    }
  }

  async function handleOpenModal(id: string, index: number) {
    setSelectRemoveWorkExperienceId({
      id,
      index,
    })
    setModalOpen(true)
  }

  async function handleRemoveFieldActivity() {
    try {
      // await studentSubjectsService.removeSubject(selectRemoveWorkExperienceId.id)
      remove(selectRemoveWorkExperienceId.index)
      onHandleUpdate()
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

  function onHandleChangeActivity() {
    console.log(1)
  }

  return (
    <Box>
      <form className="form">
        {fields.map(({ id, _id }, index) => (
          <Box key={id}>
            <Box maxWidth={500}>
              <Box marginBottom={2}>
                <TextField
                  {...register(`fields_activity.${index}.activity`)}
                  id={`fields_activity.${index}.activity`}
                  select
                  type="text"
                  label="Activity"
                  variant="standard"
                  className="form-field"
                  placeholder="Activity"
                  fullWidth
                  onChange={onHandleChangeActivity}
                  InputLabelProps={{ shrink: true }}
                  disabled={fields.length - 1 > index}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </TextField>
              </Box>
              <Box marginBottom={2}>
                <TextField
                  {...register(`fields_activity.${index}.skills`)}
                  id={`fields_activity-${index}-skills`}
                  select
                  type="text"
                  label="Skills"
                  variant="standard"
                  className="form-field"
                  placeholder="Skills"
                  fullWidth
                  onChange={onHandleChangeActivity}
                  InputLabelProps={{ shrink: true }}
                  disabled={fields.length - 1 > index}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </TextField>
              </Box>
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
        <Box display="flex" alignItems="center" marginBottom={3} maxWidth={400}>
          <Stack direction="row" gap={2}>
            <Button
              type="submit"
              variant="outlined"
              size="small"
              onClick={handleSubmit(handleAddFieldActivity)}
            >
              <Box
                component="span"
                marginRight={1}
                display="inline-block"
                style={{
                  verticalAlign: 'middle',
                }}
              >
                <Icon icon={IconEnum.PLUS} color={colors.primary} size={16} />
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
              Do you really want to remove field activity?
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
                onClick={handleRemoveFieldActivity}
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

export default FieldsActivityForm
