//libs
import Link from 'next/link'

// material ui components
import Container from '@mui/material/Container'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'

// custom components
import Layout from '@/layouts/Layout'
import TeachersBlock from '@/blocks/TeachersBlock'

export default function Teachers() {
  return (
    <>
      <Layout>
        <Container maxWidth="xl">
          <Breadcrumbs aria-label="breadcrumb" className="breadcrumbs">
            <Link href="/" className="breadcrumbs__link">
              Home
            </Link>
            <Typography
              variant="body1"
              component="span"
              className="breadcrumbs__text"
            >
              Teachers
            </Typography>
          </Breadcrumbs>
          <Typography marginBottom={3} variant="h3">
            Teachers list
          </Typography>
          <TeachersBlock />
        </Container>
      </Layout>
    </>
  )
}
