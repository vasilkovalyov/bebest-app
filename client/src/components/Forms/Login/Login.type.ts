import { ILogin } from './Login.service'

export interface ILoginFormProps {
  onSubmit: (props: ILogin) => void
  isLoading: boolean
  validationMessage?: string | null
}
