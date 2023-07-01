// libs
import { useState } from 'react'
import { useRouter } from 'next/router'
import { AxiosError } from 'axios'

//redux
import { useActions } from '@/redux/hooks'

// services
import authService from '@/services/auth'
import studentService from '@/services/student'
import teacherService from '@/services/teacher'
import companyService from '@/services/company'

// relate utils
import { ILogin } from './Login.type'

// other utils
import pages from '@/constants/pages'

type UseLoginReturnType = {
  loading: boolean
  messageValidation: string | null
  onSubmit: (props: ILogin) => void
}

export function useLogin(): UseLoginReturnType {
  const router = useRouter()
  const { setAuthState, setStudentState, setTeacherState, setCompanyState } =
    useActions()
  const [loading, setloading] = useState<boolean>(false)
  const [messageValidation, setMessageValidation] = useState<string | null>(
    null
  )

  async function onSubmit({ email, password }: ILogin) {
    try {
      setloading(true)
      const loginResponse = await authService.loginUser(email, password)
      if (loginResponse.status === 200) {
        setMessageValidation(null)
      }

      const { role } = loginResponse.data

      router.push(pages.cabinet).then(() => {
        if (role === 'student') {
          studentService.getAccountInfo().then((userResponse) => {
            setAuthState({
              _id: userResponse.data._id,
              name: userResponse.data.name,
              surname: userResponse.data.surname,
              avatar: userResponse.data.avatar,
              role: userResponse.data.role,
            })
            setStudentState(userResponse.data)
          })
        }
        if (role === 'teacher') {
          teacherService.getAccountInfo().then((userResponse) => {
            setAuthState({
              _id: userResponse.data._id,
              name: userResponse.data.name,
              surname: userResponse.data.surname,
              avatar: userResponse.data.avatar,
              role: userResponse.data.role,
            })
            setTeacherState(userResponse.data)
          })
        }
        if (role === 'company') {
          companyService.getAccountInfo().then((userResponse) => {
            setAuthState({
              _id: userResponse.data._id,
              name: userResponse.data.admin_name,
              surname: userResponse.data.admin_surname,
              avatar: userResponse.data.avatar,
              role: userResponse.data.role,
            })
            setCompanyState(userResponse.data)
          })
        }

        setloading(false)
      })
    } catch (e) {
      if (e instanceof AxiosError) {
        setMessageValidation(e.response?.data.error)
      }
      setloading(false)
    }
  }

  return { loading, messageValidation, onSubmit }
}
