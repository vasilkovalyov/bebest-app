export interface IRegistrationTeacher {
  name: string
  surname: string
  email: string
  password: string
  confirm_password: string
}

export interface IRegistrationTeacherFormProps {
  onSubmit: (props: IRegistrationTeacher) => void
  isLoading: boolean
  validationMessage?: string | null
}
