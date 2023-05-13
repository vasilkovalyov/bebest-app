// layouts
import CabinetLayout from '@/layouts/CabinetLayout'

// other utils
import { useAuthContext } from '@/context/auth-context'

function PagePrivateInfo() {
  const { user } = useAuthContext()
  return <CabinetLayout currentPageTitle="Private info"></CabinetLayout>
}

export default PagePrivateInfo
