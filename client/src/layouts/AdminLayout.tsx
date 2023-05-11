// libs
import Link from 'next/link'
import Head from 'next/head'

// material ui components
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'

// custom components
import Layout from '@/components/Layout'
import ContainerWithShadow from '@/components/Generic/ContainerWithShadow'
import AdminNavigation from '@/components/AdminNavigation'

// other utils
import { useAuthContext } from '@/context/auth-context'

function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuthContext()

  return (
    <>
      <Head>
        <title>LearnLangPlatform - Admin</title>
        <meta
          name="description"
          content="The platform for learning languages"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Container>
          <Breadcrumbs aria-label="breadcrumb" className="breadcrumbs">
            <Link
              href="/"
              className="breadcrumbs__item breadcrumbs__item--link color-dark-blue-1 font-medium"
            >
              Home
            </Link>
            <Typography
              variant="body2"
              className="MuiTypography breadcrumbs__item font-medium"
            >
              Admin
            </Typography>
          </Breadcrumbs>
          <Box className="section-admin">
            <Typography
              marginBottom={3}
              variant="h2"
              className="MuiTypography section-admin__heading"
            >
              Account
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={4} md={3}>
                <ContainerWithShadow paddingSize="sm">
                  <Stack direction="row" spacing={2}>
                    <Box marginBottom={2}>
                      <Avatar alt={user?.name} />
                    </Box>
                    <Box marginBottom={3}>
                      <Typography variant="body1">
                        {user?.name} {user?.surname}
                      </Typography>
                      <Typography variant="body2">{user?.role}</Typography>
                    </Box>
                  </Stack>
                  <Box component="ul">
                    {user ? <AdminNavigation role={user?.role} /> : null}
                  </Box>
                </ContainerWithShadow>
              </Grid>
              <Grid item xs={12} sm={8} md={9}>
                <ContainerWithShadow paddingSize="sm">
                  <div className="gutter-row">{children}</div>
                </ContainerWithShadow>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Layout>
    </>
  )
}

export default AdminLayout
