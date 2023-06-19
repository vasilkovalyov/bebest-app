export interface IRegistrationCompany {
  company_name: string
  admin_name: string
  admin_surname: string
  email: string
  password: string
  confirm_password: string
}

export interface IRegistrationCompanyFormProps {
  onSubmit: (props: IRegistrationCompany) => void
  isLoading: boolean
  validationMessage?: string | null
}
