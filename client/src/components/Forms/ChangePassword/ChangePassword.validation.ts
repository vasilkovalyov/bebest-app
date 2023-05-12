import * as yup from 'yup'
import { passwordRegex } from '@/utils/password-validation-schema'

export const PasswordChangeFormValidationSchema = yup.object().shape({
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
