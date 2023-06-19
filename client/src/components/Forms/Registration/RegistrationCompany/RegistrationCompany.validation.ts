import * as yup from 'yup'
import { passwordRegex } from '@/utils/password-validation-schema'

export const RegistrationFormValidationSchema = yup.object().shape({
  company_name: yup.string().required('Company name is required'),
  admin_name: yup.string().required('Admin name is required'),
  admin_surname: yup.string().required('Admin surname is required'),
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
