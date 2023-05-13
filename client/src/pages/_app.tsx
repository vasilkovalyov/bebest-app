// libs
import type { AppProps } from 'next/app'

// other utils
import { AuthProvider } from '@/context/auth-context'
import authService from '@/services/auth'
import studentService, { IAuthUserInfo } from '@/services/student'
import pages from '@/constants/pages'

// styles
import '@/styles/scss/main.scss'

export default function App({
  Component,
  pageProps,
}: AppProps<{ user: IAuthUserInfo }>) {
  return (
    <AuthProvider {...pageProps}>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

App.getInitialProps = async ({ ctx }: any): Promise<IAuthUserInfo | any> => {
  if (!ctx.req) {
    return {
      pageProps: {
        user: null,
      },
    }
  }

  const pathname = ctx.pathname.split('/')[1]

  try {
    const { token, userId, role } = ctx.req.cookies
    if (pathname === pages.cabinet.replace('/', '') && !token) {
      ctx.res.writeHead(302, { Location: '/404' })
      ctx.res.end()
      return
    }
    const auth = await authService.isAuth(token)

    if (pathname === pages.cabinet.replace('/', '') && !auth.isAuth) {
      ctx.res.writeHead(302, { Location: '/404' })
      ctx.res.end()
      return
    }
    const user = await studentService.getUserInfo(role, userId, token)
    const userData = await user.data

    return {
      pageProps: {
        user: userData,
      },
    }
  } catch (e) {
    console.log(e)
    if (e instanceof Error) {
      console.log('e', e.message)
      return {
        pageProps: {
          user: null,
        },
      }
    }
  }
}
