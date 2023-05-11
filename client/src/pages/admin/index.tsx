// layouts
import AdminLayout from '@/layouts/AdminLayout'

// other utils
import { useAuthContext } from '@/context/auth-context'

function PageAdmin() {
  const { user } = useAuthContext()
  return <AdminLayout heading="Account"></AdminLayout>
}

export default PageAdmin
