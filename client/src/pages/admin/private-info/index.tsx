// layouts
import AdminLayout from '@/layouts/AdminLayout'

// other utils
import { useAuthContext } from '@/context/auth-context'

function PagePrivateInfo() {
  const { user } = useAuthContext()
  return (
    <AdminLayout>
      Private Info Page
      <div>{JSON.stringify(user, null, 2)}</div>
    </AdminLayout>
  )
}

export default PagePrivateInfo
