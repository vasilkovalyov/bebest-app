// material ui components
import Box from '@mui/material/Box'

// layouts
import CabinetLayout from '@/layouts/CabinetLayout'

// blocks
import StudentAccount from '../../blocks/StudentAccount'

//redux
import { useSelector } from 'react-redux'
import { selectAuthState } from '@/redux/slices/auth'

function PageCabinet() {
  const { user } = useSelector(selectAuthState)

  return (
    <CabinetLayout>
      <Box marginBottom={4}>
        {user.role === 'student' && <StudentAccount />}
      </Box>
    </CabinetLayout>
  )
}

export default PageCabinet
