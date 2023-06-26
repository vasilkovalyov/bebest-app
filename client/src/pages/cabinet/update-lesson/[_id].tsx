//libs
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next/types'
import Link from 'next/link'
import { AxiosError } from 'axios'

// material ui components
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'

// custom components
import Layout from '@/layouts/Layout'
import teacherService from '@/services/teacher'
import { ITeacherFullInfo } from '@/types/teacher/teacher'
import TeacherSidebarBlock from '@/blocks/TeacherSidebarBlock'
import { pageRoutesPrivate } from '@/constants/page-routes'
import CreateLessonBlock from '@/blocks/CreateLessonBlock'
import ContainerWithShadow from '@/components/Generic/ContainerWithShadow'
import { LessonType } from '@/types/lessons'
import UpdateLessonBlock from '@/blocks/UpdateLessonBlock'

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
        <Box className="create-lesson-page">
          <Box className="create-lesson-page__body">
            <UpdateLessonBlock />
          </Box>
          <Box className="create-lesson-page__aside"></Box>
        </Box>
      </Container>
    </Layout>
  )
}
