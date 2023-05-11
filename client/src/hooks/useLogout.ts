import { useRouter } from 'next/router'
import { destroyCookie } from 'nookies'
import { useAuthContext } from '@/context/auth-context'

export function useLogout() {
  const router = useRouter()
  const { setUser } = useAuthContext()

  function logOut() {
    router.push('/').then(() => {
      destroyCookie(null, 'role')
      destroyCookie(null, 'userId')
      destroyCookie(null, 'token')
      setUser(null)
    })
  }

  return {
    logOut,
  }
}
