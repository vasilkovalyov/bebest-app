import { IStudentRegistration } from '@/types/student/student'

export interface IRegistrationStudentFormProps {
  onSubmit: (props: IStudentRegistration) => void
  isLoading: boolean
  validationMessage?: string | null
}
