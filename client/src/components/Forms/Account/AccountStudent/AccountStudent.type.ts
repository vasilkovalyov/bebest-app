import { UserAccountInfoEditType } from '@/services/student'

export interface IAccountStudentFormProps {
  initialData: UserAccountInfoEditType
  onSubmit: (props: UserAccountInfoEditType) => void
  isLoading: boolean
  validationMessage?: string | null
}
