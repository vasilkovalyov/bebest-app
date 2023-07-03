// libs
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import dayjs from 'dayjs'

// material ui components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'

//custom components
import Icon from '@/components/Generic/Icon'
import { IconEnum } from '@/types/icons'

// relate utils
import { ILessonModuleProps } from './LessonModule.type'
import { LessonModuleFormValidationSchema } from './LessonModule.validation'

// other utils
import { TeacherLessonModuleUpdateType } from '@/types/teacher/teacher-lesson-module'
import dateFormat from '@/constants/date-forma'
import colors from '@/constants/colors'
import { Typography } from '@mui/material'

function LessonModuleForm({
  initialData,
  isLoading,
  mode,
  onSubmit,
}: ILessonModuleProps) {
  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<TeacherLessonModuleUpdateType>({
    mode: 'onSubmit',
    resolver: yupResolver(LessonModuleFormValidationSchema),
  })

  function setInitialData() {
    if (!initialData) return
    setValue('topic', initialData.topic)
    setValue('rich_text', initialData.rich_text)
    setValue('duration_time', initialData.duration_time)
    setValue('start_date', initialData.start_date.split('T')[0])
    setValue('time_start', initialData.time_start)
  }

  useEffect(() => {
    setInitialData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function onHandleSubmit(props: TeacherLessonModuleUpdateType) {
    const convertedDate = dayjs(props.start_date).format(dateFormat.base)

    onSubmit({
      ...props,
      start_date: `${convertedDate}T${props.time_start}`,
      time_start: props.time_start,
    })
  }

  return (
    <form
      name="form-login"
      className="form form-lesson"
      onSubmit={handleSubmit(onHandleSubmit)}
    >
      <Grid container gap={0.5} justifyContent="space-between">
        <Grid item xs={12} marginBottom={2}>
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
        <Grid item xs={12} marginBottom={2}>
          <TextField
            {...register('rich_text')}
            id={'rich_text'}
            type="text"
            label="Description"
            variant="standard"
            className="form-field"
            fullWidth
            defaultValue={getValues().rich_text || ' '}
            InputLabelProps={{ shrink: true }}
            error={!!errors.rich_text?.message}
            helperText={errors.rich_text?.message}
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
        </Grid>
        <Grid item xs={12} marginBottom={2}>
          <Stack direction="row" spacing={1}>
            <Icon
              icon={IconEnum.INFO_CIRCULAR_OUTLINE}
              size={18}
              color={colors.blue}
            />
            <Typography variant="body1">
              The date and time of the module must not be later than the start
              date of the workshop
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="center" alignItems="center">
            <Button
              type="submit"
              variant="contained"
              size="small"
              disabled={isLoading}
            >
              {mode === 'create' ? 'Create ' : null}
              {mode === 'update' ? 'Update ' : null} module
            </Button>
            <Box ml={2}>
              {isLoading ? <CircularProgress size={16} /> : null}
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </form>
  )
}

export default LessonModuleForm
