//libs
import { useEffect, useState } from 'react'
import cn from 'classnames'

// material ui components
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Fade from '@mui/material/Fade'
import CircularProgress from '@mui/material/CircularProgress'

//custom components
import TeacherLessonCard from '@/components/TeacherLessonCard'
import {
  ITeacherLesson,
  ITeacherLessonExtended,
} from '@/types/teacher/teacher-lesson'
import { ITeacherLessonCardProps } from '@/components/TeacherLessonCard/TeacherLessonCard.type'

//relate util
import { ITeacherLessonsProps } from './TeacherLessons.type'

//other utils
import teacherLessonService from '@/services/teacher-lesson'

function TeacherLessons({ className }: ITeacherLessonsProps) {
  const [loading, setLoading] = useState<boolean>(false)
  const [teachers, setTeachers] = useState<ITeacherLessonExtended[]>([])

  async function loadTeachers() {
    setLoading(true)

    const response = await teacherLessonService.getUserLessons()
    setTeachers(response.data)
    setLoading(false)
  }

  useEffect(() => {
    loadTeachers()
  }, [])

  return (
    <Box className={cn('teacher-lessons', className)}>
      {loading ? (
        <Box textAlign="center">
          <Fade in={true} unmountOnExit>
            <CircularProgress />
          </Fade>
        </Box>
      ) : (
        <>
          {teachers.length ? (
            <Grid container gap={1.2} justifyContent="space-between">
              {teachers.map((teacher) => (
                <Grid item key={teacher._id} xs={12} md={5.8}>
                  <TeacherLessonCard {...teacher} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body1">No data.</Typography>
          )}
        </>
      )}
    </Box>
  )
}

export default TeacherLessons
