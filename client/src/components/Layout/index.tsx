import { ILayoutProps } from './Layout.type'
import Head from 'next/head'
import Header from '../Header'

function Layout({
  title = 'Title',
  description = 'Description',
  children,
}: ILayoutProps) {
  return (
    <div id="wrapper">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description}></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>{children}</main>
      <footer></footer>
    </div>
  )
}

export default Layout
