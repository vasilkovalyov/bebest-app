import * as yup from 'yup'

export const LessonFormValidationSchema = yup.object().shape({
  topic: yup.string().required('Topic is required'),
  description: yup.string().required('Description is required'),
  subject: yup.string().required('Subject is required'),
  // duration_time: yup.string().required('Duration time is required'),
  // duration_months: yup.string().required('Duration months is required'),
  start_date: yup
    .date()
    .required('Date is required')
    .test('Date must be more then today date', function (value) {
      const todayDate = new Date()
      return value && value.getTime() > todayDate.getTime()
    })
    .required('Date is required'),
  time_start: yup.string().required('Time start is required'),
  max_users: yup.string().required('Max users is required'),
  is_free: yup.boolean().notRequired(),
  price: yup.string().when('is_free', {
    is: true,
    then: (schema) => schema.notRequired(),
    otherwise: (schema) => {
      return schema.required('Price is required')
    },
  }),
})
