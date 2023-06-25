//libs
import Link from 'next/link'

// material ui components
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'

//custom components
import ContainerWithShadow from '@/components/Generic/ContainerWithShadow'

// layouts
import CabinetLayout from '@/layouts/CabinetLayout'

//other utils
import { pageRoutesPublic } from '@/constants/page-routes'

export default function CabinetTeachers() {
  return (
    <CabinetLayout currentPageTitle="Teachers">
      <ContainerWithShadow paddingSize="sm">
        <Typography
          marginBottom={3}
          variant="h3"
          className="section-admin__heading"
        >
          Favorite teachers
        </Typography>
        <Box marginBottom={3}>
          <Divider />
        </Box>

        <Box textAlign="center">
          <Typography marginBottom={3}>
            Wee have not yet received the desired mentor in the department.
          </Typography>
          <Link href={`/${pageRoutesPublic.teachers}`}>Choose teachers</Link>
        </Box>
      </ContainerWithShadow>
    </CabinetLayout>
  )
}
