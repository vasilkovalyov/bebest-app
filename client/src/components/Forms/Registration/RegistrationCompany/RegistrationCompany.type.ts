import { ICompanyRegistration } from '@/types/company/company'

export interface IRegistrationCompanyFormProps {
  onSubmit: (props: ICompanyRegistration) => void
  isLoading: boolean
  validationMessage?: string | null
}
