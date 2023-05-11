// layouts
import AdminLayout from '@/layouts/AdminLayout'

// other utils
import { useAuthContext } from '@/context/auth-context'

function PageAdmin() {
  const { user } = useAuthContext()
  return (
    <AdminLayout>
      User Admin Page
      <div>{JSON.stringify(user, null, 2)}</div>
    </AdminLayout>
  )
}

export default PageAdmin
