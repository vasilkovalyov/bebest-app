// libs
import { ChangeEvent, useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'

//redux
import { useAppSelector } from '@/redux/hooks'

// material ui components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'

//custom components
import { IconEnum } from '@/types/icons'
import Icon from '@/components/Generic/Icon'
import WarningIcon from '@/components/Generic/WarningIcon'

// relate utils
import {
  IUserFieldsActivityInfo,
  IUserFieldsActivityFormProps,
} from './UserFieldsActivity.type'

import { useUserFieldsActivity } from './useUserFieldsActivity'

// other utils
import colors from '@/constants/colors'
import { IFieldActivity } from '@/types/common'

const defaultWorkExperience: IFieldActivity = {
  subject: '',
  categories: [],
}

const defaultInitialData: IUserFieldsActivityInfo = {
  fields_activity: [defaultWorkExperience],
}

function UserFieldsActivityForm({
  onHandleClose,
}: IUserFieldsActivityFormProps) {
  const user = useAppSelector((store) => store.user)
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const {
    checkedSkills,
    selectedSkills,
    subjects,
    selectRemoveFieldActivity,
    fieldsActivityStore,
    createActivity,
    changeActivity,
    deleteActivity,
    getSubjectByActivityName,
    changeAndUpdatedSkills,
    setSelectRemoveFieldActivity,
  } = useUserFieldsActivity()

  const defaultFields = fieldsActivityStore.length
    ? defaultInitialData.fields_activity
    : []

  const { handleSubmit, register, setValue, getValues, control } =
    useForm<IUserFieldsActivityInfo>({
      mode: 'onSubmit',
      defaultValues: {
        fields_activity: [...(fieldsActivityStore || []), ...defaultFields],
      },
    })

  const { fields, remove, append } = useFieldArray({
    control,
    name: 'fields_activity',
  })

  async function onHandleCreateActivity(data: IUserFieldsActivityInfo) {
    if (!user.user.role) return
    try {
      createActivity(data, user.user.role).then(() => {
        append(defaultWorkExperience)
      })
    } catch (e) {
      console.log(e)
    }
  }

  async function onHandleDelete() {
    if (!user.user.role) return
    deleteActivity(user.user.role).then(() => {
      remove(selectRemoveFieldActivity.index)
      onHandleCloseModal()
    })
  }

  function onHandleOpenModal(id: string, index: number) {
    setSelectRemoveFieldActivity({
      id,
      index,
    })
    setModalOpen(true)
  }

  function onHandleCloseModal() {
    setModalOpen(false)
  }

  function onHandleChangeActivity(activity: string, index: number) {
    changeActivity(activity, index)
    const activitySubjects = getSubjectByActivityName(activity)

    setValue(`fields_activity.${index}._id`, activitySubjects[0]._id)
    setValue(`fields_activity.${index}.subject`, activitySubjects[0].subject)
  }

  function onHandleChangeSkills(
    event: SelectChangeEvent<string[]>,
    index: number
  ) {
    const values = event.target.value as string[]
    const updatedCheckedSkills = changeAndUpdatedSkills(values, index)

    setValue(
      `fields_activity.${index}.categories`,
      updatedCheckedSkills[index].subjects
    )
  }

  function onHandleAddFormActivity() {
    setValue('fields_activity', [defaultWorkExperience])
  }

  return (
    <Box>
      <form className="form">
        {getValues().fields_activity.length ? (
          <Box maxWidth={500}>
            {fields.map(({ id, _id }, index) => (
              <Box key={id}>
                <Box marginBottom={2}>
                  <TextField
                    {...register(`fields_activity.${index}.subject`)}
                    id={`fields_activity.${index}.subject`}
                    select
                    type="text"
                    label="Activity"
                    variant="standard"
                    className="form-field"
                    placeholder="Activity"
                    fullWidth
                    onChange={(
                      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                    ) => {
                      onHandleChangeActivity(e.target.value, index)
                    }}
                    InputLabelProps={{ shrink: true }}
                    value={getValues().fields_activity[index].subject || ' '}
                    defaultValue={
                      fields.length - 1 !== index
                        ? getValues().fields_activity[index].subject
                        : [' ']
                    }
                    disabled={fields.length - 1 > index}
                  >
                    <MenuItem disabled value=" ">
                      Select activity
                    </MenuItem>
                    {subjects.length
                      ? subjects.map(({ _id, subject }) => (
                          <MenuItem key={_id} value={subject}>
                            {subject}
                          </MenuItem>
                        ))
                      : null}
                  </TextField>
                </Box>
                <Box marginBottom={2}>
                  <Typography variant="body1" fontWeight={500}>
                    Skills
                  </Typography>
                  <Select
                    {...register(`fields_activity.${index}.categories`)}
                    id={`fields_activity-${index}-skills`}
                    multiple
                    value={
                      checkedSkills.length &&
                      checkedSkills[index] &&
                      checkedSkills[index].subjects.length
                        ? checkedSkills[index].subjects.map(
                            (item) => item.category
                          )
                        : ['']
                    }
                    defaultValue={['']}
                    disabled={fields.length - 1 > index}
                    onChange={(e: SelectChangeEvent<string[]>) => {
                      onHandleChangeSkills(e, index)
                    }}
                    renderValue={(selected) => {
                      const updatedSelected = selected.filter(
                        (item) => item !== ''
                      )
                      return updatedSelected.join(',')
                    }}
                  >
                    <MenuItem disabled value=" ">
                      Select skills
                    </MenuItem>

                    {selectedSkills.length && selectedSkills[index]
                      ? selectedSkills[index].subjects.map((item) => (
                          <MenuItem
                            key={item._id}
                            id={item._id}
                            value={item.category}
                          >
                            <Checkbox
                              checked={
                                checkedSkills.length &&
                                checkedSkills[index] &&
                                checkedSkills[index].subjects
                                  ? checkedSkills[index].subjects
                                      .map((item) => item.category)
                                      .indexOf(item.category) > -1
                                  : false
                              }
                            />
                            <ListItemText primary={item.category} />
                          </MenuItem>
                        ))
                      : null}
                  </Select>
                </Box>
                {fields.length - 1 > index ? (
                  <>
                    <Button
                      type="button"
                      size="small"
                      onClick={() => onHandleOpenModal(_id || '', index)}
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
                  onClick={handleSubmit(onHandleCreateActivity)}
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
                    Create activity
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
            onClick={onHandleAddFormActivity}
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
              Add activity
            </Box>
          </Button>
        )}
      </form>
      <Modal open={modalOpen} onClose={onHandleCloseModal}>
        <Box className="modal-box">
          <Button
            className="modal-box__button-close"
            onClick={onHandleCloseModal}
          >
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
                onClick={onHandleCloseModal}
              >
                decline
              </Button>
              <Button variant="outlined" size="small" onClick={onHandleDelete}>
                accept
              </Button>
            </Stack>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}

export default UserFieldsActivityForm
