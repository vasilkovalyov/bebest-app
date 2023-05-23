// libs
import React, { ReactNode } from 'react'
import type { AppProps } from 'next/app'
import { parseCookies } from 'nookies'

//redux
import { Provider } from 'react-redux'
import { wrapper } from '@/redux/store'
import { setAuthState } from '@/redux/slices/auth'

//material ui
import { ThemeProvider } from '@mui/material/styles'

// other utils
import authService from '@/services/auth'
import studentService from '@/services/student'
import pages from '@/constants/pages'
import theme from '../theme/primaryTheme'

// styles
import '@/styles/scss/main.scss'
import { UserRole } from '@/types/role'

type AppPropsWithLayout = AppProps & {
  Component: ReactNode
}

function App({ Component, ...rest }: AppPropsWithLayout) {
  const { store, props } = wrapper.useWrappedStore(rest)

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Component {...props.pageProps} />
      </ThemeProvider>
    </Provider>
  )
}

App.getInitialProps = wrapper.getInitialAppProps(
  (store) =>
    async ({ ctx, Component }) => {
      if (!ctx.req) {
        return {
          pageProps: {
            user: null,
          },
        }
      }

      try {
        const { token, userId, role } = parseCookies(ctx)
        if (ctx.asPath === pages.cabinet.replace('/', '') && !token) {
          ctx.res?.writeHead(302, { Location: '/404' })
          ctx.res?.end()
        }

        const response = await authService.isAuth(token)

        if (
          ctx.asPath === pages.cabinet.replace('/', '') &&
          !response?.isAuth
        ) {
          ctx.res?.writeHead(302, { Location: '/404' })
          ctx.res?.end()
        }

        const user = await studentService.getUserInfo(
          role as UserRole,
          userId,
          token
        )
        const userData = await user.data
        store.dispatch(setAuthState(userData))
      } catch (e) {
        if (e instanceof Error) {
          console.log('e', e.message)
        }
      }
      return {
        pageProps: Component.getInitialProps
          ? await Component.getInitialProps({ ...ctx, store })
          : {},
      }
    }
)

export default App
