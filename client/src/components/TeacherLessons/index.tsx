//libs
import Link from 'next/link'
import { useEffect, useState } from 'react'
import cn from 'classnames'

// services
import teacherLessonService from '@/services/teacher-lesson'

// material ui components
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Fade from '@mui/material/Fade'
import CircularProgress from '@mui/material/CircularProgress'

//custom components
import Icon from '@/components/Generic/Icon'
import { IconEnum } from '@/types/icons'

import TeacherLessonCard from '@/components/TeacherLessonCard'
import { TeacherLessonFullInfoType } from '@/types/teacher/teacher-lesson'

//relate util
import { ITeacherLessonsProps } from './TeacherLessons.type'

//other utils
import colors from '@/constants/colors'
import { pageRoutesPrivate } from '@/constants/page-routes'

function TeacherLessons({ className }: ITeacherLessonsProps) {
  const [loading, setLoading] = useState<boolean>(false)
  const [teachers, setTeachers] = useState<TeacherLessonFullInfoType[]>([])

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
                  <TeacherLessonCard
                    {...teacher}
                    actionEdit={
                      <Box position="absolute" top={20} right={20}>
                        <Link
                          href={`/${pageRoutesPrivate.cabinetUpdateLesson}/${teacher._id}`}
                          className="teacher-lesson-card__edit"
                        >
                          <Icon
                            icon={IconEnum.EDIT}
                            size={18}
                            color={colors.black_color}
                          />
                        </Link>
                      </Box>
                    }
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box textAlign="center">
              <Box marginBottom={2}>
                <Icon
                  icon={IconEnum.LESSONS}
                  size={40}
                  color={colors.dark_blue}
                />
              </Box>
              <Typography variant="h5">No lessons</Typography>
            </Box>
          )}
        </>
      )}
    </Box>
  )
}

export default TeacherLessons
