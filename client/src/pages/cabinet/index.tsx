//redux
import { useAppSelector } from '@/redux/hooks'

// material ui components
import Box from '@mui/material/Box'

// layouts
import CabinetLayout from '@/layouts/CabinetLayout'

// blocks
import StudentAccountBlock from '@/blocks/StudentAccountBlock'

function PageCabinet() {
  const user = useAppSelector((store) => store.user.user)

  return (
    <CabinetLayout>
      <Box marginBottom={4}>
        {user.role === 'student' && <StudentAccountBlock />}
      </Box>
    </CabinetLayout>
  )
}

export default PageCabinet
