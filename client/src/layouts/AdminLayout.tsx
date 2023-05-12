// libs
import Link from 'next/link'
import Head from 'next/head'

// material ui components
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'

// custom components
import Header from '@/components/Header'
import ContainerWithShadow from '@/components/Generic/ContainerWithShadow'
import AdminNavigation from '@/components/AdminNavigationMenuPages'

// other utils
import { useAuthContext } from '@/context/auth-context'

function AdminLayout({
  heading,
  children,
}: {
  heading?: string
  children?: React.ReactNode
}) {
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
      <Header />
      <main>
        <Container maxWidth="xl">
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
            <ContainerWithShadow
              paddingSize="sm"
              className="section-admin__aside admin-aside-menu"
            >
              <Stack
                direction="row"
                spacing={2}
                className="admin-aside-menu__user"
                marginBottom={2}
              >
                <Box>
                  <Avatar
                    alt={user?.name}
                    className="admin-aside-menu__user-image"
                  />
                </Box>
                <Box marginBottom={3} className="admin-aside-menu__user-info">
                  <Typography variant="body1" className="font-bold">
                    {user?.name} {user?.surname}
                  </Typography>
                  <Typography variant="body2">{user?.role}</Typography>
                </Box>
              </Stack>
              <Box
                component="ul"
                className="admin-navigation-menu admin-navigation-menu--aside-menu"
              >
                {user ? <AdminNavigation role={user?.role} /> : null}
              </Box>
            </ContainerWithShadow>
            <ContainerWithShadow
              paddingSize="sm"
              className="section-admin__body"
            >
              {heading ? (
                <Typography
                  marginBottom={3}
                  variant="h3"
                  className="MuiTypography section-admin__heading"
                >
                  {heading}
                </Typography>
              ) : null}
              <div className="gutter-row">{children}</div>
            </ContainerWithShadow>
          </Box>
        </Container>
      </main>
    </>
  )
}

export default AdminLayout
