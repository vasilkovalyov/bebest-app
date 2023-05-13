import { passwordRegex } from '@/utils/password-validation-schema'
import * as yup from 'yup'

export const LoginFormValidationSchema = yup.object().shape({
  email: yup.string().email('Wrong email').required('Email is required'),
  password: yup
    .string()
    .matches(
      passwordRegex,
      'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character (!@#$%^&*)'
    )
    .required('Password is required'),
})
