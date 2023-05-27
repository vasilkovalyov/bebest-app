import * as yup from 'yup'
import { passwordRegex } from '@/utils/password-validation-schema'

export const RegistrationFormValidationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  surname: yup.string().required('Surname is required'),
  email: yup.string().email('Wrong email').required('Email is required'),
  password: yup
    .string()
    .matches(
      passwordRegex,
      'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character (!@#$%^&*)'
    )
    .required('Password is required'),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match'),
})
