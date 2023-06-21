// libs
import { useState, ChangeEvent } from 'react'
import { useForm } from 'react-hook-form'

//redux
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@/redux/hooks'
import { fetchTeacherPersonalInfo } from '@/redux/slices/teacher-personal-info'

// material ui components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Modal from '@mui/material/Modal'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControl from '@mui/material/FormControl'
import Stack from '@mui/material/Stack'

//custom components
import Icon from '@/components/Generic/Icon'
import { IconEnum } from '@/types/icons'
import InfoIcon from '@/components/Generic/InfoIcon'

// relate utils
import { ITeacherCostPersonalLessonsFormProps } from './TeacherCostPersonalLessons.type'

// other utils
import teacherCostPersonalLessonsService, {
  UseTrialLessonType,
} from '@/services/teacher-cost-personal-lessons'
import { useLoadUserInfo } from '@/hooks/useLoadUserInfo'
import { ICostPersonalLesson } from '@/types/common'
import colors from '@/constants/colors'

const defaultData: ICostPersonalLesson = {
  duration: '',
  price: '',
  is_free: false,
  trial_duration: '',
  trial_price: '',
  is_trial_free: false,
  use_trial: 'false',
}

function TeacherCostPersonalLessons({
  onHandleClose,
}: ITeacherCostPersonalLessonsFormProps) {
  const dispatch = useDispatch<any>()
  const { loadUserInfo } = useLoadUserInfo()

  const teacherPersonalInfo = useAppSelector(
    (store) => store.teacherPersonalInfo
  )

  const [isFreeLessons, setIsFreeLessons] = useState<boolean>(
    teacherPersonalInfo.personal_lessons?.is_free || defaultData.is_free
  )
  const [isTrialFreeLessons, setIsTrialFreeLessons] = useState<boolean>(
    teacherPersonalInfo.personal_lessons?.is_trial_free ||
      defaultData.is_trial_free
  )
  const [useTrial, setUseTrial] = useState<UseTrialLessonType>(
    teacherPersonalInfo.personal_lessons?.use_trial || defaultData.use_trial
  )
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  function handleCloseModal() {
    setModalOpen(false)
  }

  const { handleSubmit, register, setValue } = useForm<ICostPersonalLesson>({
    mode: 'onSubmit',
    defaultValues: teacherPersonalInfo.personal_lessons || defaultData,
  })

  async function onHandleSave(data: ICostPersonalLesson) {
    try {
      await teacherCostPersonalLessonsService.updatePersonalLessonsInfo(data)
      dispatch(fetchTeacherPersonalInfo())
      loadUserInfo('teacher')
      onHandleClose()
    } catch (e) {
      console.log(e)
    }
  }

  function onChangeFreeLessons() {
    setIsFreeLessons(!isFreeLessons)
    setValue('is_free', !isFreeLessons)
    setValue('price', '')
  }

  function onChangeTrialFreeTrialLessons() {
    setIsTrialFreeLessons(!isTrialFreeLessons)
    setValue('trial_price', '')
  }

  function onChangeUseTrialLessons(value: UseTrialLessonType) {
    setUseTrial(value)
    setValue('use_trial', value)
    setValue('trial_duration', '')
    setValue('trial_price', '')
  }

  return (
    <Box>
      <form className="form">
        <Box marginBottom={3} maxWidth={400}>
          <Typography variant="h6" marginBottom={3}>
            Personal lesson
          </Typography>
          <Box marginBottom={2}>
            <TextField
              {...register('duration')}
              id="duration"
              type="time"
              label="Duration"
              variant="standard"
              className="form-field"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Box>
          <Box marginBottom={2}>
            <TextField
              {...register('price')}
              id="price"
              type="number"
              label="Price"
              variant="standard"
              className="form-field"
              fullWidth
              InputLabelProps={{ shrink: true }}
              disabled={isFreeLessons}
              inputProps={{
                pattern: '[0-9]*',
                inputMode: 'numeric',
              }}
            />
          </Box>
          <Box marginBottom={2}>
            <FormControlLabel
              {...register('is_free')}
              label="Free lessons"
              onChange={onChangeFreeLessons}
              control={<Checkbox checked={isFreeLessons} />}
            />
          </Box>
        </Box>
        <Box marginBottom={3} maxWidth={400}>
          <Typography
            variant="h6"
            marginBottom={1}
            position="relative"
            display="inline-block"
            paddingRight={3}
          >
            Trial lesson
            <Box
              onClick={() => setModalOpen(true)}
              position="absolute"
              top={-2}
              right={0}
              style={{
                cursor: 'pointer',
              }}
            >
              <Icon
                icon={IconEnum.INFO_CIRCULAR_OUTLINE}
                size={18}
                color={colors.blue}
              />
            </Box>
          </Typography>
          <Box marginBottom={1}>
            <FormControl>
              <RadioGroup
                {...register('use_trial')}
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={useTrial}
                defaultValue={useTrial}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  onChangeUseTrialLessons(e.target.value as UseTrialLessonType)
                }}
              >
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label="I want to conduct trial classes"
                />
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label="I do NOT want to do trial classes"
                />
              </RadioGroup>
            </FormControl>
          </Box>
          {useTrial === 'true' ? (
            <>
              <Box marginBottom={2}>
                <TextField
                  {...register('trial_duration')}
                  id="trial_duration"
                  type="time"
                  label="Duration"
                  variant="standard"
                  className="form-field"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
              <Box marginBottom={2}>
                <TextField
                  {...register('trial_price')}
                  id="trial_price"
                  type="number"
                  label="Price"
                  variant="standard"
                  className="form-field"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  disabled={isTrialFreeLessons}
                  inputProps={{
                    pattern: '[0-9]*',
                    inputMode: 'numeric',
                  }}
                />
              </Box>
              <Box marginBottom={2}>
                <FormControlLabel
                  {...register('is_trial_free')}
                  label="Free trial lessons"
                  onChange={onChangeTrialFreeTrialLessons}
                  control={<Checkbox checked={isTrialFreeLessons} />}
                />
              </Box>
            </>
          ) : null}
        </Box>
        <Stack direction="row" gap={2}>
          <Button
            type="submit"
            variant="contained"
            size="small"
            onClick={handleSubmit(onHandleSave)}
          >
            <Box
              component="span"
              display="inline-block"
              style={{
                verticalAlign: 'middle',
                paddingTop: 2,
              }}
            >
              Save
            </Box>
          </Button>
          <Button variant="outlined" size="small" onClick={onHandleClose}>
            Close
          </Button>
        </Stack>
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
              color={colors.black}
              className="modal-box__button-close-icon"
            />
          </Button>
          <Box className="modal-box__inner">
            <Box textAlign="center" marginBottom={2}></Box>
            <Box maxWidth={300}>
              <Box textAlign="center" marginBottom={2}>
                <InfoIcon />
              </Box>
              <Typography variant="h4" className="ta-c">
                Trial Lesson
              </Typography>
              <Typography variant="body1" className="ta-c">
                One-time trial session with one student, designed to get to know
                the student and discuss learning goals
              </Typography>
              <Box textAlign="center">
                <Button
                  size="small"
                  variant="contained"
                  onClick={handleCloseModal}
                >
                  Close
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}

export default TeacherCostPersonalLessons
