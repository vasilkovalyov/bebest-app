import * as yup from 'yup'

export const AccountStudentFormValidationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  surname: yup.string().required('Surname is required'),
  email: yup.string().email('Wrong email').required('Email is required'),
})
