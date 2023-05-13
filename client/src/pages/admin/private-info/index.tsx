// layouts
import AdminLayout from '@/layouts/AdminLayout'

// other utils
import { useAuthContext } from '@/context/auth-context'

function PagePrivateInfo() {
  const { user } = useAuthContext()
  return (
    <AdminLayout
      heading="Private info"
      currentPageTitle="Private info"
    ></AdminLayout>
  )
}

export default PagePrivateInfo
