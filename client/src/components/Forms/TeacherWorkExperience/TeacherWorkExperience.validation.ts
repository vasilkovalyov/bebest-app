import * as yup from 'yup'

export const TeacherWorkExperienceFormValidationSchema = yup.object().shape({
  work_experience: yup.array().of(
    yup.object().shape({
      company_name: yup.string().required('company_name is required'),
      startDate: yup.string().required('Start date is required'),
      isStillWorking: yup.boolean().notRequired(),
      // endDate: yup.string().when('isStillWorking', {
      //   is: true,
      //   then: (schema) => schema.notRequired(),
      //   otherwise: (schema) => {
      //     return schema.min(
      //       yup.ref('startDate'),
      //       'End date must be bigger start date'
      //     )
      //   },
      // }),
    })
  ),
})
