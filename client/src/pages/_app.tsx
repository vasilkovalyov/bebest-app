import type { AppProps } from 'next/app'
import { GetServerSidePropsContext, GetServerSideProps } from 'next'

import '../styles/scss/main.scss'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<{ props: any }> => {
  return {
    props: {},
  }
}
