// libs
import type { AppProps } from 'next/app'

// other utils
import { AuthProvider } from '@/context/auth-context'
import { IAuthUserInfo, isAuth, getUserInfo } from '@/services/auth'
import pages from '@/constants/pages'

// styles
import '@/styles/scss/main.scss'

export default function App({
  Component,
  pageProps,
}: AppProps<{ user: IAuthUserInfo }>) {
  return (
    <AuthProvider {...pageProps} user={pageProps.user}>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

App.getInitialProps = async ({ ctx }: any): Promise<IAuthUserInfo | any> => {
  const pathname = ctx.pathname.split('/')[1]
  try {
    const { token, userId, role } = ctx.req.cookies
    if (pathname === pages.admin.replace('/', '') && !token) {
      ctx.res.writeHead(302, { Location: '/404' })
      ctx.res.end()
      return
    }
    const auth = await isAuth(token)

    if (pathname === pages.admin.replace('/', '') && !auth.isAuth) {
      ctx.res.writeHead(302, { Location: '/404' })
      ctx.res.end()
      return
    }
    const user = await getUserInfo(role, userId, token)
    const userData = await user.data

    return {
      pageProps: {
        user: userData,
      },
    }
  } catch (e) {
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
