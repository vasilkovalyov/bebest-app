import * as yup from 'yup'

export const LoginFormValidationSchema = yup.object().shape({
  email: yup.string().email('Wrong email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Length of password should be more then 6 letters')
    .required('Password is required'),
})
