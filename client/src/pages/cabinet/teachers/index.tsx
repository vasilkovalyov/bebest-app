// material ui components
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Fade from '@mui/material/Fade'
import CircularProgress from '@mui/material/CircularProgress'

//custom components
import Icon from '@/components/Generic/Icon'
import { IconEnum } from '@/types/icons'
import ContainerWithShadow from '@/components/Generic/ContainerWithShadow'
import TeacherCostPersonalLessons from '@/components/Forms/TeacherCostPersonalLessons'
import PreviewTeacherCostPersonalLessons from '@/components/Previews/PreviewTeacherCostPersonalLessons'

// layouts
import CabinetLayout from '@/layouts/CabinetLayout'
import Link from 'next/link'

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
          <Link href="/teachers">Choose teachers</Link>
        </Box>
      </ContainerWithShadow>
    </CabinetLayout>
  )
}
