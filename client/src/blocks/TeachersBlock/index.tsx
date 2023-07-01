// libs
import { useEffect } from 'react'

// hooks
import { useTeachers } from './useTeachers'

// material ui components
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Fade from '@mui/material/Fade'
import CircularProgress from '@mui/material/CircularProgress'

// custom components
import ContainerWithShadow from '@/components/Generic/ContainerWithShadow'
import TeacherPreviewCard from '@/components/TeacherPreviewCard'

export default function TeachersBlock() {
  const { teachers, loading, loadTeachers } = useTeachers()

  useEffect(() => {
    loadTeachers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Grid container justifyContent="space-between" gap={1}>
      <Grid item md={4}>
        <ContainerWithShadow paddingSize="sm">Filter aside</ContainerWithShadow>
      </Grid>
      <Grid item md={7}>
        <ContainerWithShadow>
          {loading ? (
            <Box textAlign="center">
              <Fade in={true} unmountOnExit>
                <CircularProgress />
              </Fade>
            </Box>
          ) : (
            <>
              {teachers.length ? (
                teachers.map((teacher) => (
                  <TeacherPreviewCard key={teacher._id} {...teacher} />
                ))
              ) : (
                <Typography>There are not teachers</Typography>
              )}
            </>
          )}
        </ContainerWithShadow>
      </Grid>
    </Grid>
  )
}
