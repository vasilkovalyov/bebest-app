import Layout from '@/components/Layout'

import { useAuthContext } from '../context/auth-context'

export default function Home() {
  const { userId } = useAuthContext()
  return (
    <>
      <Layout>Home page {userId}</Layout>
    </>
  )
}
