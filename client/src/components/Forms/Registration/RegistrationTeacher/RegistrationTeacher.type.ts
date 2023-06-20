import { ITeacherRegistration } from '@/types/teacher/teacher'

export interface IRegistrationTeacherFormProps {
  onSubmit: (props: ITeacherRegistration) => void
  isLoading: boolean
  validationMessage?: string | null
}
