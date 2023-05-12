export interface IChangePassword {
  password: string
  confirm_password: string
}

export interface IChangePasswordFormProps {
  onSubmit: (props: IChangePassword) => void
  isLoading: boolean
  validationMessage?: string | null
}
