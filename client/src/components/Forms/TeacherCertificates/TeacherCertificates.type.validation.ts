import * as yup from 'yup'

export const TeacherCertificatesFormValidationSchema = yup.object().shape({
  certificates: yup.array().of(
    yup.object().shape({
      name: yup.string().required('name is required'),
      date: yup.string().required('date is required'),
      image: yup.string().required('file is required'),
    })
  ),
})
