// libs
import Head from 'next/head'
import cn from 'classnames'

// custom components
import Header from '@/components/Header'

function Layout({
  title = 'title',
  description = 'description',
  children,
  className,
}: {
  title?: string
  description?: string
  className?: string
  children?: React.ReactNode
}) {
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
