//redux
import { useAppSelector } from '@/redux/hooks'

// material ui components
import Box from '@mui/material/Box'

// layouts
import CabinetLayout from '@/layouts/CabinetLayout'

// blocks
import StudentAccountBlock from '@/blocks/StudentAccountBlock'
import StudentEducationInfoBlock from '@/blocks/StudentEducationInfoBlock'

function PageCabinet() {
  const user = useAppSelector((store) => store.user.user)

  return (
    <CabinetLayout>
      <Box marginBottom={4}>
        <StudentAccountBlock />
      </Box>
      {user.role === 'student' ? (
        <>
          <Box marginBottom={4}>
            <StudentEducationInfoBlock />
          </Box>
        </>
      ) : null}
    </CabinetLayout>
  )
}

export default PageCabinet
