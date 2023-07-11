//libs
import { useRouter } from 'next/router'
import Link from 'next/link'

// material ui components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'

// custom components
import Layout from '@/layouts/Layout'
import { pageRoutesPrivate } from '@/constants/page-routes'
import CreateLessonBlock from '@/blocks/CreateLessonBlock'
import { LessonType } from '@/types/lessons'
import { TeacherTrainingPlanDefaultContent } from '@/blocks/TeacherTrainingPlanBlock'

export default function CreateLesson() {
  const { query } = useRouter()

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
            Create teacher lesson {query.type}
          </Typography>
        </Breadcrumbs>
        <Typography marginBottom={3} variant="h3">
          Create lesson {query.type}
        </Typography>
        <Box className="lesson-page">
          <Grid container gap={3} justifyContent="space-between">
            <Grid item xs={12} md={7}>
              <CreateLessonBlock lessonType={query.type as LessonType} />
            </Grid>
            <Grid item xs={12} md={4}>
              <Box className="lesson-page__aside" marginBottom={4}></Box>
            </Grid>
            <Grid item xs={12}>
              <TeacherTrainingPlanDefaultContent />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Layout>
  )
}
