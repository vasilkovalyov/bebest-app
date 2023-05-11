export interface IRegistrationStudent {
  name: string
  surname: string
  email: string
  password: string
  confirm_password: string
}

export interface IRegistrationStudentFormProps {
  onSubmit: (props: IRegistrationStudent) => void
  isLoading: boolean
  validationMessage?: string | null
}
