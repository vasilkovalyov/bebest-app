export interface IAccountStudent {
  name: string
  surname: string
  email: string
  phone?: string
}

export interface IAccountStudentFormProps {
  initialData: IAccountStudent
  onSubmit: (props: IAccountStudent) => void
  isLoading: boolean
  validationMessage?: string | null
}
