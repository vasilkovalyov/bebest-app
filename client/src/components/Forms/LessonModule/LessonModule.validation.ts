import * as yup from 'yup'

export const LessonModuleFormValidationSchema = yup.object().shape({
  topic: yup.string().required('Topic is required'),
  rich_text: yup.string().required('Description is required'),
  duration_time: yup.string().required('Duration time is required'),
  start_date: yup
    .date()
    .required('Date is required')
    .test('Date must be more then today date', function (value) {
      const todayDate = new Date()
      return value && value.getTime() > todayDate.getTime()
    })
    .required('Date is required'),
  time_start: yup.string().required('Time start is required'),
})
