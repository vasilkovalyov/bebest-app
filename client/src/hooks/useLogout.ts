import { useRouter } from 'next/router'
import { destroyCookie } from 'nookies'
//redux
import { useDispatch } from 'react-redux'
import { removeAuthState } from '@/redux/slices/auth'

export function useLogout() {
  const router = useRouter()
  const dispatch = useDispatch()

  function logOut() {
    router.push('/').then(() => {
      destroyCookie(null, 'role')
      destroyCookie(null, 'userId')
      destroyCookie(null, 'token')
      dispatch(removeAuthState())
    })
  }

  return {
    logOut,
  }
}
