import { useRouter } from 'next/router'
import { destroyCookie } from 'nookies'

import { useActions } from '@/redux/hooks'

export function useLogout() {
  const router = useRouter()
  const {
    removeAuthState,
    removeTeacherState,
    removeCompanyState,
    removeStudentState,
  } = useActions()

  function logOut() {
    router.push('/').then(() => {
      destroyCookie(null, 'role')
      destroyCookie(null, 'userId')
      destroyCookie(null, 'token')
      removeAuthState()
      removeStudentState()
      removeTeacherState()
      removeCompanyState()
    })
  }

  return {
    logOut,
  }
}
