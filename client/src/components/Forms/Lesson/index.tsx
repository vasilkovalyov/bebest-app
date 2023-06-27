// libs
import { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import dayjs from 'dayjs'

//redux
import { useAppSelector } from '@/redux/hooks'

// material ui components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import CircularProgress from '@mui/material/CircularProgress'
import MenuItem from '@mui/material/MenuItem'

//custom components
import ContainerWithShadow from '@/components/Generic/ContainerWithShadow'

// relate utils
import { ILessonFormProps } from './Lesson.type'
import { LessonFormValidationSchema } from './Lesson.validation'

// other utils
import { ITeacherLessonEditableProps } from '@/types/teacher/teacher-lesson'
import { getMonthsNumbers } from '@/utils/getMonthsNumbers'
import { getTimeWithCurrentTimeZone } from '@/utils/date'
import dateFormat from '@/constants/date-forma'
import { SelectChangeEvent } from '@mui/material'

function LessonForm({
  initialData,
  lessonType,
  isLoading,
  mode,
  onSubmit,
}: ILessonFormProps) {
  const subjects = useAppSelector((store) => store.subjects.subjects)
  const [isFree, setIsFree] = useState<boolean>(false)
  const [subjectValue, setSubjectValue] = useState<string>('')

  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<ITeacherLessonEditableProps>({
    mode: 'onSubmit',
    resolver: yupResolver(LessonFormValidationSchema),
  })

  function setInitialData() {
    if (!initialData) return
    setValue('topic', initialData.topic)
    setValue('description', initialData.description)
    setValue('subject', initialData.subject)
    if (initialData.subject.length) {
      setSubjectValue(initialData.subject)
    }
    setValue('time_start', initialData.time_start)
    setValue('max_users', initialData.max_users)
    setValue('price', initialData.price)
    setValue('start_date', initialData.start_date.split('T')[0])
    setIsFree(initialData.is_free ? true : false)

    if (initialData.duration_months)
      setValue('duration_months', initialData.duration_months)
    if (initialData.duration_time)
      setValue('duration_time', initialData.duration_time)
  }

  useEffect(() => {
    setInitialData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData])

  function onHandleSubmit(props: ITeacherLessonEditableProps) {
    let formatDate: string = ''

    if (props.start_date) {
      const convertedDate = dayjs(props.start_date).format(dateFormat.base)
      const timeWithCurrentTimeZone = getTimeWithCurrentTimeZone(
        props.time_start
      )
      formatDate = `${convertedDate}T${timeWithCurrentTimeZone}`
    }

    onSubmit({
      ...props,
      max_users: +props.max_users,
      start_date: formatDate,
      time_start: getTimeWithCurrentTimeZone(props.time_start),
    })
  }

  function onChangeFreeLessons() {
    setIsFree(!isFree)
    setValue('is_free', !isFree)
    setValue('price', '')
  }

  function onChangeSubject(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setSubjectValue(value)
  }

  return (
    <Box marginBottom={4}>
      <ContainerWithShadow paddingSize="sm">
        <form
          name="form-login"
          className="form form-lesson"
          onSubmit={handleSubmit(onHandleSubmit)}
        >
          <Grid container gap={0.5} justifyContent="space-between">
            <Grid item xs={12} md={7.8} marginBottom={2}>
              <TextField
                {...register('topic')}
                id="topic"
                name="topic"
                type="text"
                label="Topic"
                variant="standard"
                className="form-field"
                fullWidth
                InputLabelProps={{ shrink: true }}
                error={!!errors.topic?.message}
                helperText={errors.topic?.message}
              />
            </Grid>
            <Grid item xs={12} md={3.8} marginBottom={2}>
              <TextField
                {...register('subject')}
                id={'subject'}
                select
                type="text"
                label="Subject"
                variant="standard"
                className="form-field"
                placeholder="Subject"
                fullWidth
                onChange={onChangeSubject}
                value={subjectValue}
                defaultValue={subjectValue}
                InputLabelProps={{ shrink: true }}
                error={!!errors.subject?.message}
                helperText={errors.subject?.message}
              >
                <MenuItem disabled value=" ">
                  Select subject
                </MenuItem>
                {subjects.length
                  ? subjects.map(({ _id, subject }) => (
                      <MenuItem key={_id} value={_id}>
                        {subject}
                      </MenuItem>
                    ))
                  : null}
              </TextField>
            </Grid>
            <Grid item xs={12} marginBottom={2}>
              <TextField
                {...register('description')}
                id="description"
                name="description"
                type="text"
                label="Description"
                variant="standard"
                className="form-field"
                fullWidth
                multiline
                minRows={5}
                InputLabelProps={{ shrink: true }}
                error={!!errors.description?.message}
                helperText={errors.description?.message}
              />
            </Grid>
            <Grid item xs={12} md={3.8} marginBottom={2}>
              <TextField
                {...register('start_date')}
                id={'start_date'}
                type="date"
                label="Start date"
                variant="standard"
                className="form-field"
                fullWidth
                InputLabelProps={{ shrink: true }}
                error={!!errors.start_date?.message}
                helperText={errors.start_date?.message}
              />
            </Grid>
            <Grid item xs={12} md={3.8} marginBottom={2}>
              <TextField
                {...register('time_start')}
                id="time_start"
                type="time"
                label="Time start"
                variant="standard"
                className="form-field"
                fullWidth
                InputLabelProps={{ shrink: true }}
                error={!!errors.time_start?.message}
                helperText={errors.time_start?.message}
              />
            </Grid>
            <Grid item xs={12} md={3.8} marginBottom={2}>
              {lessonType === 'single' ? (
                <TextField
                  {...register('duration_time')}
                  id="duration_time"
                  type="time"
                  label="Duration time"
                  variant="standard"
                  className="form-field"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.duration_time?.message}
                  helperText={errors.duration_time?.message}
                />
              ) : null}

              {lessonType === 'multiple' ? (
                <TextField
                  {...register('duration_months')}
                  id={'duration_months'}
                  select
                  type="text"
                  label="Duration months"
                  variant="standard"
                  className="form-field"
                  placeholder="Duration"
                  fullWidth
                  defaultValue={' '}
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.duration_months?.message}
                  helperText={errors.duration_months?.message}
                >
                  <MenuItem disabled value=" ">
                    Select duration
                  </MenuItem>
                  {getMonthsNumbers().map(({ count, title }) => (
                    <MenuItem key={count} value={count}>
                      {title}
                    </MenuItem>
                  ))}
                </TextField>
              ) : null}
            </Grid>
          </Grid>
          <Grid
            container
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Grid item xs={12} md={3.8} marginBottom={2}>
              <TextField
                {...register('max_users')}
                id="max_users"
                type="number"
                label="Max num of people"
                variant="standard"
                className="form-field"
                fullWidth
                InputLabelProps={{ shrink: true }}
                error={!!errors.max_users?.message}
                helperText={errors.max_users?.message}
              />
            </Grid>
            <Grid item xs={12} md={3.8} marginBottom={2}>
              <TextField
                {...register('price')}
                id="price"
                type="number"
                label="Price"
                variant="standard"
                className="form-field"
                fullWidth
                disabled={isFree}
                InputLabelProps={{ shrink: true }}
                error={!!errors.price?.message}
                helperText={errors.price?.message}
              />
            </Grid>
            <Grid item xs={12} md={3.8} marginBottom={2}>
              <Box paddingTop={3}>
                <FormControlLabel
                  {...register('is_free')}
                  label="Free"
                  onChange={onChangeFreeLessons}
                  control={
                    <Checkbox
                      {...register('is_free')}
                      onChange={() => onChangeFreeLessons()}
                      checked={isFree}
                    />
                  }
                />
              </Box>
            </Grid>
          </Grid>
          <Box display="flex" alignItems="center">
            <Button
              type="submit"
              variant="contained"
              size="small"
              disabled={isLoading}
            >
              {mode === 'create' ? 'Create ' : null}
              {mode === 'update' ? 'Update ' : null} lesson
            </Button>
            <Box ml={2}>
              {isLoading ? <CircularProgress size={16} /> : null}
            </Box>
          </Box>
        </form>
      </ContainerWithShadow>
    </Box>
  )
}

export default LessonForm
