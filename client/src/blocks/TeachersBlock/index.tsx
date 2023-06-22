// libs
import { useEffect, useState } from 'react'

// material ui components
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Fade from '@mui/material/Fade'
import CircularProgress from '@mui/material/CircularProgress'

// custom components
import ContainerWithShadow from '@/components/Generic/ContainerWithShadow'

//other utils
import teacherService from '@/services/teacher'
import { ITeacherPreviewInfo } from '@/types/teacher/teacher'
import TeacherPreviewCard from '@/components/TeacherPreviewCard'

export default function TeachersBlock() {
  const [teachers, setTeachers] = useState<ITeacherPreviewInfo[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  async function loadTeachers() {
    setLoading(true)
    const response = await teacherService.getUsers()
    setTeachers(response.data)
    if (response.data.length) {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTeachers()
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
