import NextApp from 'next/app'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../context/auth-context'
import { parseCookies } from 'nookies'

import '../styles/scss/main.scss'

interface IAppProps {
  userId: string
}

interface IInitialProps {
  pageProps: IAppProps
}

export default function App({ Component, pageProps }: AppProps<IAppProps>) {
  return (
    <AuthProvider {...pageProps}>
      <Component />
    </AuthProvider>
  )
}

App.getInitialProps = async ({ ctx }: any): Promise<IInitialProps> => {
  const { token } = parseCookies(ctx)

  if (token) {
    return {
      pageProps: {
        userId: token,
      },
    }
  }

  return {
    pageProps: {
      userId: '',
    },
  }
}
