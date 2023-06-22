import * as yup from 'yup'

export const AccountCompanyFormValidationSchema = yup.object().shape({
  company_name: yup.string().required('company name is required'),
  admin_name: yup.string().required('admin name is required'),
  admin_surname: yup.string().required('admin surname is required'),
  email: yup.string().email('Wrong email').required('Email is required'),
})
