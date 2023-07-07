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
  ISkillsChecked,
  ISubjectsActivities,
} from './UserFieldsActivity.type'
import {
  getFieldsAndSubjectsData,
  getUpdatedCheckedSkills,
} from './UserFieldsActivity.utils'

// other utils
import colors from '@/constants/colors'
import userFieldsActivityService from '@/services/user-fields-activity'
import { useLoadUserInfo } from '@/hooks/useLoadUserInfo'
import { IFieldActivity, IFieldActivityRequest } from '@/types/common'
import { ISubjectCategory } from '@/types/subjects'

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
  const dispatch = useDispatch<any>()
  const fieldsActivityStore = useAppSelector(
    (store) => store.teacherPersonalInfo.fields_activity
  )

  const user = useAppSelector((store) => store.user)
  const subjects = useAppSelector((store) => store.subjects.subjects)
  const { loadUserInfo } = useLoadUserInfo()

  const [checkedSkills, setCheckedSkills] = useState<ISkillsChecked[] | []>([])
  const [selectedSkills, setSelectedSkills] = useState<
    ISubjectsActivities[] | []
  >([])
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

  async function handleCreateActivity(data: IUserFieldsActivityInfo) {
    if (!user.user.role) return

    try {
      const fieldsActivity = {
        ...data.fields_activity[data.fields_activity.length - 1],
      }

      const props: IFieldActivityRequest = {
        subject: fieldsActivity._id || '',
        categories: checkedSkills[checkedSkills.length - 1].subjects.map(
          (item) => item._id
        ),
      }

      await userFieldsActivityService.createMainFieldsActivity(
        props,
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
      await userFieldsActivityService.deleteMainFieldsActivity(
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
      if (item.subject === activity) return item
    })

    if (tempArr.length === 0 && checkedSkillsArr.length === 0) {
      tempArr.push({ subjects: activitySubjects[0].categories })
    } else {
      tempArr = tempArr.map((item, key) => {
        if (index !== key) return item
        return { subjects: activitySubjects[0].categories }
      })

      checkedSkillsArr = checkedSkillsArr.map((item, key) => {
        if (index !== key) return item
        item = { subjects: [] }
        return item
      })
    }

    setValue(`fields_activity.${index}._id`, activitySubjects[0]._id)
    setValue(`fields_activity.${index}.subject`, activitySubjects[0].subject)
    setSelectedSkills(tempArr)
    setCheckedSkills(checkedSkillsArr)
  }

  function onHandleChangeSkills(
    event: SelectChangeEvent<string[]>,
    index: number
  ) {
    const values = event.target.value as string[]
    const categories: ISubjectCategory[] = []

    values.forEach((item) => {
      if (!item) return

      const subject = selectedSkills[selectedSkills.length - 1].subjects.find(
        (skill) => skill.category === item
      )
      if (subject) {
        categories.push(subject)
      }
    })

    const updatedCheckedSkills = getUpdatedCheckedSkills(
      checkedSkills,
      categories,
      index
    )

    setValue(
      `fields_activity.${index}.categories`,
      updatedCheckedSkills[index].subjects
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                  onClick={handleSubmit(handleCreateActivity)}
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
