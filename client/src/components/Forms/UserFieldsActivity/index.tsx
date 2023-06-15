// libs
import { ChangeEvent, useState, useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'

//redux
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@/redux/hooks'
import { fetchTeacherPersonalInfo } from '@/redux/slices/teacher-personal-info'

// material ui components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'

//custom components
import { IconEnum } from '@/components/Generic/Icon/Icon.type'
import Icon from '@/components/Generic/Icon'
import WarningIcon from '@/components/Generic/WarningIcon'

// relate utils
import {
  IUserFieldsActivityInfo,
  IUserFieldsActivityFormProps,
  ISkillsChecked,
  ISubjects,
} from './UserFieldsActivity.type'
import {
  getFieldsAndSubjectsData,
  getUpdatedCheckedSkills,
} from './UserFieldsActivity.utils'

// other utils
import colors from '@/constants/colors'
import userFieldsActivityService, {
  IUserFieldActivity,
} from '@/services/user-fields-activity'
import { useLoadUserInfo } from '@/hooks/useLoadUserInfo'

const defaultWorkExperience: IUserFieldActivity = {
  activity: '',
  skills: [],
}

const defaultInitialData: IUserFieldsActivityInfo = {
  fields_activity: [defaultWorkExperience],
}

function UserFieldsActivityForm({
  onHandleClose,
}: IUserFieldsActivityFormProps) {
  const dispatch = useDispatch<any>()
  const fieldsActivityStore = useAppSelector(
    (store) => store.teacherPersonalInfo.fields_activity
  )

  const user = useAppSelector((store) => store.user)
  const subjects = useAppSelector((store) => store.subjects.subjects)
  const { loadUserInfo } = useLoadUserInfo()

  const [checkedSkills, setCheckedSkills] = useState<ISkillsChecked[] | []>([])
  const [selectedSkills, setSelectedSkills] = useState<ISubjects[] | []>([])
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [selectRemoveFieldActivity, setSelectRemoveFieldActivity] = useState<{
    id: string
    index: number
  }>({
    id: '',
    index: -1,
  })

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

  async function handleAdd(data: IUserFieldsActivityInfo) {
    if (!user.user.role) return
    try {
      const fieldsActivity = {
        ...data.fields_activity[data.fields_activity.length - 1],
      }
      await userFieldsActivityService.addMainFieldsActivity(
        fieldsActivity,
        user.user.role
      )

      dispatch(fetchTeacherPersonalInfo())
      loadUserInfo('teacher')
      append(defaultWorkExperience)
      setSelectedSkills((prevState) => [...prevState, { subjects: [] }])
    } catch (e) {
      console.log(e)
    }
  }

  function removeCheckedSkill() {
    const checkedArr = checkedSkills.filter((item, key) => {
      if (key !== selectRemoveFieldActivity.index) return item
    })
    setCheckedSkills(checkedArr)
  }
  function removeSelectedSkill() {
    const selectedSkillsArr = selectedSkills.filter((item, key) => {
      if (key !== selectRemoveFieldActivity.index) return item
    })
    setSelectedSkills(selectedSkillsArr)
  }

  async function handleRemove() {
    if (!user.user.role) return
    try {
      await userFieldsActivityService.removeMainFieldsActivity(
        selectRemoveFieldActivity.id,
        user.user.role
      )
      dispatch(fetchTeacherPersonalInfo())
      loadUserInfo('teacher')
      remove(selectRemoveFieldActivity.index)
      setSelectRemoveFieldActivity({
        id: '',
        index: -1,
      })
      handleCloseModal()

      removeCheckedSkill()
      removeSelectedSkill()
    } catch (e) {
      console.log(e)
    }
  }

  function handleOpenModal(id: string, index: number) {
    setSelectRemoveFieldActivity({
      id,
      index,
    })
    setModalOpen(true)
  }

  function handleCloseModal() {
    setModalOpen(false)
  }

  function onHandleChangeActivity(activity: string, index: number) {
    let tempArr = [...selectedSkills]
    let checkedSkillsArr = [...checkedSkills]

    const activitySubjects = subjects.filter((item) => {
      if (item.category === activity) return item
    })

    if (tempArr.length === 0 && checkedSkillsArr.length === 0) {
      tempArr.push({ subjects: activitySubjects[0].children })
    } else {
      tempArr = tempArr.map((item, key) => {
        if (index !== key) return item
        return { subjects: activitySubjects[0].children }
      })

      checkedSkillsArr = checkedSkillsArr.map((item, key) => {
        if (index !== key) return item
        item = { subjects: [] }
        return item
      })
    }
    setValue(`fields_activity.${index}.activity`, activitySubjects[0].category)
    setSelectedSkills(tempArr)
    setCheckedSkills(checkedSkillsArr)
  }

  function onHandleChangeSkills(
    event: SelectChangeEvent<string[]>,
    index: number
  ) {
    const values = event.target.value as string[]
    const updatedCheckedSkills = getUpdatedCheckedSkills(
      checkedSkills,
      values,
      index
    )
    setCheckedSkills(updatedCheckedSkills)
  }

  function loadSubjects() {
    if (!fieldsActivityStore.length) return
    const { subjectArr, checkedSubjectArr } = getFieldsAndSubjectsData(
      fieldsActivityStore,
      subjects
    )
    setSelectedSkills(subjectArr)
    setCheckedSkills(checkedSubjectArr)
  }

  function handleAddFormActivity() {
    setValue('fields_activity', [defaultWorkExperience])
  }

  useEffect(() => {
    loadSubjects()
  }, [])

  return (
    <Box>
      <form className="form">
        {getValues().fields_activity.length ? (
          <Box maxWidth={500}>
            {fields.map(({ id, _id }, index) => (
              <Box key={id}>
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
                    onChange={(
                      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                    ) => {
                      onHandleChangeActivity(e.target.value, index)
                    }}
                    InputLabelProps={{ shrink: true }}
                    value={getValues().fields_activity[index].activity || ' '}
                    defaultValue={
                      fields.length - 1 !== index
                        ? getValues().fields_activity[index].activity
                        : [' ']
                    }
                    disabled={fields.length - 1 > index}
                  >
                    <MenuItem disabled value=" ">
                      Select activity
                    </MenuItem>
                    {subjects.length
                      ? subjects.map(({ _id, category }) => (
                          <MenuItem key={_id} value={category}>
                            {category}
                          </MenuItem>
                        ))
                      : null}
                  </TextField>
                </Box>
                <Box marginBottom={2}>
                  <InputLabel>Skills</InputLabel>
                  <Select
                    {...register(`fields_activity.${index}.skills`)}
                    id={`fields_activity-${index}-skills`}
                    multiple
                    value={
                      checkedSkills.length &&
                      checkedSkills[index] &&
                      checkedSkills[index].subjects.length
                        ? checkedSkills[index].subjects
                        : ['']
                    }
                    defaultValue={['']}
                    disabled={fields.length - 1 > index}
                    onChange={(e: SelectChangeEvent<string[]>) =>
                      onHandleChangeSkills(e, index)
                    }
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
                          <MenuItem key={item._id} value={item.subject}>
                            <Checkbox
                              checked={
                                checkedSkills.length &&
                                checkedSkills[index] &&
                                checkedSkills[index].subjects
                                  ? checkedSkills[index].subjects.indexOf(
                                      item.subject
                                    ) > -1
                                  : false
                              }
                            />
                            <ListItemText primary={item.subject} />
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
                  onClick={handleSubmit(handleAdd)}
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
                    Add activity
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
            onClick={handleAddFormActivity}
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
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box className="modal-box">
          <Button
            className="modal-box__button-close"
            onClick={handleCloseModal}
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
                onClick={handleCloseModal}
              >
                decline
              </Button>
              <Button variant="outlined" size="small" onClick={handleRemove}>
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
