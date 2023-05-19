// material ui components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'

//redux
import { useSelector } from 'react-redux'
import { selectAuthState } from '@/redux/slices/auth'

function CabinetSidebarUserInfo() {
  const { user } = useSelector(selectAuthState)

  return (
    <Stack direction="row" alignItems="center" spacing={2} padding={2.5}>
      <Box>
        <Avatar alt={user.name} style={{ width: '54px', height: '54px' }} />
      </Box>
      <Box marginBottom={3}>
        <Typography variant="body2" marginBottom={0.5}>
          {user.name} {user.surname}
        </Typography>
        <Typography variant="body1" marginBottom={0}>
          {user?.role}
        </Typography>
      </Box>
    </Stack>
  )
}

export default CabinetSidebarUserInfo
