import * as yup from 'yup'

export const StudentSubjectsFormValidationSchema = yup.object().shape({
  subjects: yup.array().of(
    yup.object().shape({
      subject_study: yup.string().required('subject study is required'),
      level_mastery_subject: yup
        .string()
        .required('level mastery subject is required'),
    })
  ),
})
