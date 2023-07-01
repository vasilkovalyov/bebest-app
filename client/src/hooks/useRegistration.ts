// libs
import { useState } from 'react'
import { AxiosError } from 'axios'

// types
import { IStudentRegistration } from '@/types/student/student'
import { ITeacherRegistration } from '@/types/teacher/teacher'
import { ICompanyRegistration } from '@/types/company/company'
import { UserRole } from '@/types/role'

// services
import studentService from '@/services/student'
import teacherService from '@/services/teacher'
import companyService from '@/services/company'

type RegistrationDataType =
  | IStudentRegistration
  | ITeacherRegistration
  | ICompanyRegistration

type UseRegistrationReturnType<T extends RegistrationDataType> = {
  loading: boolean
  messageSuccess: string | null
  messageValidation: string | null
  onSubmit: (data: T) => void
}

export function useRegistration<T extends RegistrationDataType>(
  role: UserRole
): UseRegistrationReturnType<T> {
  const [loading, setLoading] = useState<boolean>(false)
  const [messageValidation, setMessageValidation] = useState<string | null>(
    null
  )
  const [messageSuccess, setMessageSuccess] = useState<string | null>(null)

  async function onSubmit<T>(data: T) {
    try {
      setLoading(true)
      if (role === 'student') {
        const response = await studentService.registration(
          data as IStudentRegistration
        )
        setMessageSuccess(response.data.message)
      }
      if (role === 'teacher') {
        const response = await teacherService.registration(
          data as ITeacherRegistration
        )
        setMessageSuccess(response.data.message)
      }
      if (role === 'company') {
        const response = await companyService.registration(
          data as ICompanyRegistration
        )
        setMessageSuccess(response.data.message)
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        setMessageValidation(e.response?.data.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    messageSuccess,
    messageValidation,
    onSubmit,
  }
}
