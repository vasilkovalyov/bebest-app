// layouts
import CabinetLayout from '@/layouts/CabinetLayout'

// other utils
import { useAuthContext } from '@/context/auth-context'

function PagePrivateInfo() {
  const { user } = useAuthContext()
  return (
    <CabinetLayout
      heading="Private info"
      currentPageTitle="Private info"
    ></CabinetLayout>
  )
}

export default PagePrivateInfo
