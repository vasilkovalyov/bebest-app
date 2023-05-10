// custom components
import Layout from '@/components/Layout'

// other utils
import { useAuthContext } from '@/context/auth-context'

export default function PageAdmin() {
  const { user } = useAuthContext()
  return (
    <>
      <Layout>
        User Admin Page
        <div>{JSON.stringify(user, null, 2)}</div>
      </Layout>
    </>
  )
}
