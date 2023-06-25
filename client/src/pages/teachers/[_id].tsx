//libs
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

//other utils
import { pageRoutesPublic } from '@/constants/page-routes'

export default function Teacher({ name, surname, ...props }: ITeacherFullInfo) {
  return (
    <>
      <Layout
        title={`${name} ${surname}`}
        description={`Techer page ${name} ${surname}`}
      >
        <Container maxWidth="xl">
          <Breadcrumbs aria-label="breadcrumb" className="breadcrumbs">
            <Link href="/" className="breadcrumbs__link">
              Home
            </Link>
            <Link
              href={`/${pageRoutesPublic.teachers}`}
              className="breadcrumbs__link"
            >
              Teachers
            </Link>
            <Typography
              variant="body1"
              component="span"
              className="breadcrumbs__text"
            >
              {name} {surname}
            </Typography>
          </Breadcrumbs>
          <Typography marginBottom={3} variant="h3">
            Teacher
          </Typography>
          <Box className="teacher-page-content">
            <Box className="teacher-page-body"></Box>
            <Box component="aside" className="teacher-page-aside">
              <TeacherSidebarBlock />
            </Box>
          </Box>
        </Container>
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const teacherId = context.query._id
    const profile = await teacherService.getUserProfile(teacherId as string)
    return {
      props: profile.data,
    }
  } catch (e) {
    if (e instanceof AxiosError) {
      console.log(e.message)
    }
    return {
      props: {},
    }
  }
}
