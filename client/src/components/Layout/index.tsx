// libs
import Head from 'next/head'
import cn from 'classnames'

// custom components
import Header from '../Header'

// relate utils
import { ILayoutProps } from './Layout.type'

function Layout({
  title = 'Title',
  description = 'Description',
  children,
  className,
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
      <main className={cn(className)}>{children}</main>
      <footer></footer>
    </div>
  )
}

export default Layout
