import { useRouter } from 'next/router'
import { destroyCookie } from 'nookies'

import { useActions } from '@/redux/hooks'

export function useLogout() {
  const router = useRouter()
  const { removeAuthState } = useActions()

  function logOut() {
    router.push('/').then(() => {
      destroyCookie(null, 'role')
      destroyCookie(null, 'userId')
      destroyCookie(null, 'token')
      removeAuthState()
    })
  }

  return {
    logOut,
  }
}
