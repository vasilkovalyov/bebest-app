// libs
import Link from 'next/link'

// material ui components
import Layout from '@/layouts/Layout'
import LoginForm from '@/components/Forms/Login'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

function PageLogin() {
  return (
    <Layout className="page-login">
      <Container>
        <Breadcrumbs aria-label="breadcrumb" className="breadcrumbs">
          <Link href="/" className="breadcrumbs__link">
            Home
          </Link>
          <Typography
            variant="body1"
            component="span"
            className="breadcrumbs__text"
          >
            Login
          </Typography>
        </Breadcrumbs>
        <Typography variant="h3" className=" ta-c" marginBottom={3}>
          Sign in
        </Typography>
        <Box
          maxWidth={400}
          margin={{
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <LoginForm />
        </Box>
      </Container>
    </Layout>
  )
}

export default PageLogin
