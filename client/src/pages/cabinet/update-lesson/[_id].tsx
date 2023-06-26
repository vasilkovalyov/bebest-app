//libs
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next/types'
import Link from 'next/link'
import { AxiosError } from 'axios'

// material ui components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'

// custom components
import Layout from '@/layouts/Layout'
import { pageRoutesPrivate } from '@/constants/page-routes'
import UpdateLessonBlock from '@/blocks/UpdateLessonBlock'
import TeacherTrainingPlanBlock from '@/blocks/TeacherTrainingPlanBlock'

//other utils
import teacherLessonService from '@/services/teacher-lesson'

export default function UpdateLesson() {
  return (
    <Layout
      title="Create teacher course"
      description="Techer page create course"
    >
      <Container maxWidth="xl">
        <Breadcrumbs aria-label="breadcrumb" className="breadcrumbs">
          <Link href="/" className="breadcrumbs__link">
            Home
          </Link>
          <Link
            href={`/${pageRoutesPrivate.cabinet}`}
            className="breadcrumbs__link"
          >
            Cabinet
          </Link>
          <Link
            href={`/${pageRoutesPrivate.cabinetLesson}`}
            className="breadcrumbs__link"
          >
            Lessons
          </Link>
          <Typography
            variant="body1"
            component="span"
            className="breadcrumbs__text"
          >
            Update teacher lesson
          </Typography>
        </Breadcrumbs>
        <Typography marginBottom={3} variant="h3">
          Update lesson
        </Typography>
        <Box className="lesson-page">
          <Grid container gap={1} justifyContent="space-between">
            <Grid item xs={12} md={7}>
              <UpdateLessonBlock />
            </Grid>
            <Grid item xs={12} md={4}>
              <Box className="lesson-page__aside" marginBottom={4}></Box>
            </Grid>
            <Grid item xs={12}>
              <TeacherTrainingPlanBlock editType={true} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Layout>
  )
}
