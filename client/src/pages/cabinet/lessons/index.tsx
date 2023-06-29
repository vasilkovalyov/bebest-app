//redux
import { useAppSelector } from '@/redux/hooks'

// material ui components
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

//custom components
import ContainerWithShadow from '@/components/Generic/ContainerWithShadow'

// layouts
import CabinetLayout from '@/layouts/CabinetLayout'

import TeacherLessonsBlock from '@/blocks/TeacherLessonsBlock'

export default function PageLessons() {
  const user = useAppSelector((store) => store.user.user)
  return (
    <CabinetLayout currentPageTitle="Lessons">
      <Box marginBottom={4}>
        <ContainerWithShadow paddingSize="sm">
          <Typography
            marginBottom={3}
            variant="h3"
            className="section-admin__heading"
          >
            Lessons
          </Typography>
        </ContainerWithShadow>
      </Box>
      {user.role === 'teacher' ? <TeacherLessonsBlock /> : null}
    </CabinetLayout>
  )
}
