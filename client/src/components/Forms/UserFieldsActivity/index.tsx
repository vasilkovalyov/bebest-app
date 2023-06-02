// libs
import { ChangeEvent, useState, useEffect } from 'react'
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
import InputLabel from '@mui/material/InputLabel'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'
import ListItemText from '@mui/material/ListItemText'

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
import { Stack } from '@mui/material'
// import studentSubjectsService from '@/services/student-subjects'
import { IUserFieldActivity } from '@/services/user-fields-activity'

const defaultWorkExperience: IUserFieldActivity = {
  activity: '',
  skills: [],
}

const defaultInitialData: IUserFieldsActivityInfo = {
  fields_activity: [defaultWorkExperience],
}

function UserFieldsActivityForm({
  initialData,
  onHandleClose,
  onHandleUpdate,
}: IUserFieldsActivityFormProps) {
  const subjects = useAppSelector((store) => store.subjects.subjects)

  const [checkedSkills, setCheckedSkills] = useState<ISkillsChecked[]>([])
  const [selectedSkills, setSelectedSkills] = useState<ISubjects[]>([])
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [selectRemoveWorkExperienceId, setSelectRemoveWorkExperienceId] =
    useState<{
      id: string
      index: number
    }>({
      id: '',
      index: -1,
    })

  const { handleSubmit, register, setValue, getValues, control } =
    useForm<IUserFieldsActivityInfo>({
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

  async function handleAdd(data: IUserFieldsActivityInfo) {
    try {
      const fieldsActivity = {
        ...data.fields_activity[data.fields_activity.length - 1],
      }
      // await studentSubjectsService.addSubject(workExperience)
      append(defaultWorkExperience)
      onHandleUpdate()
      setSelectedSkills((prevState) => [...prevState, { subjects: [] }])
    } catch (e) {
      console.log(e)
    }
  }

  async function handleRemove() {
    try {
      // await studentSubjectsService.removeSubject(selectRemoveWorkExperienceId.id)
      remove(selectRemoveWorkExperienceId.index)
      onHandleUpdate()
      setSelectRemoveWorkExperienceId({
        id: '',
        index: -1,
      })
      handleCloseModal()

      const checkedArr = checkedSkills.filter((item, key) => {
        if (key !== selectRemoveWorkExperienceId.index) return item
      })
      const selectedSkillsArr = selectedSkills.filter((item, key) => {
        if (key !== selectRemoveWorkExperienceId.index) return item
      })
      setCheckedSkills(checkedArr)
      setSelectedSkills(selectedSkillsArr)
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

  function handleCloseModal() {
    setModalOpen(false)
  }

  function onHandleChangeActivity(activity: string, index: number) {
    let tempArr = [...selectedSkills]
    let checkedSkillsArr = [...checkedSkills]

    const activitySubjects = subjects.filter((item) => {
      if (item.category === activity) return item
    })

    if (tempArr.length === 0) {
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
    if (!initialData?.fields_activity.length) return
    const { subjectArr, checkedSubjectArr } = getFieldsAndSubjectsData(
      initialData?.fields_activity,
      subjects
    )
    setSelectedSkills(subjectArr)
    setCheckedSkills(checkedSubjectArr)
  }

  useEffect(() => {
    loadSubjects()
  }, [])

  return (
    <Box>
      <form className="form">
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
                    checkedSkills.length && checkedSkills[index]
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
                              checkedSkills[index].subjects.indexOf(
                                item.subject
                              ) > -1
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
        </Box>
        <Box display="flex" alignItems="center" marginBottom={3} maxWidth={400}>
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
                Add activity
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
