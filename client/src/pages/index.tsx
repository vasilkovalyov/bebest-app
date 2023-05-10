// custom components
import Layout from '@/components/Layout'

// other utils
import { useAuthContext } from '@/context/auth-context'

export default function Home() {
  const { user } = useAuthContext()

  return (
    <>
      <Layout>Home page {JSON.stringify(user)}</Layout>
    </>
  )
}
