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
import CabinetNavigation from '@/components/CabinetNavigationMenuPages'

// other utils
import { useAuthContext } from '@/context/auth-context'
import profilePages from '../constants/profile-pages'

function CabinetLayout({
  currentPageTitle,
  children,
}: {
  currentPageTitle?: string
  children?: React.ReactNode
}) {
  const { user } = useAuthContext()

  return (
    <>
      <Head>
        <title>
          LearnLangPlatform - Cabinet {user?.name} {user?.surname}
        </title>
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
            <Link href="/" className="breadcrumbs__link">
              Home
            </Link>
            {currentPageTitle ? (
              <Link href={profilePages.cabinet} className="breadcrumbs__link">
                Cabinet
              </Link>
            ) : null}
            {currentPageTitle ? (
              <Typography
                variant="body1"
                component="span"
                className="breadcrumbs__text"
              >
                {currentPageTitle}
              </Typography>
            ) : null}
            {!currentPageTitle ? (
              <Typography
                variant="body1"
                component="span"
                className="breadcrumbs__text"
              >
                Cabinet
              </Typography>
            ) : null}
          </Breadcrumbs>
          <Box className="section-cabinet">
            <ContainerWithShadow
              paddingSize="sm"
              className="section-cabinet__aside"
            >
              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                padding={2.5}
              >
                <Box>
                  <Avatar
                    alt={user?.name}
                    style={{ width: '54px', height: '54px' }}
                  />
                </Box>
                <Box marginBottom={3}>
                  <Typography variant="body2" marginBottom={0.5}>
                    {user?.name} {user?.surname}
                  </Typography>
                  <Typography variant="body1" marginBottom={0}>
                    {user?.role}
                  </Typography>
                </Box>
              </Stack>
              <Box
                component="ul"
                className="cabinet-sidebar-menu"
                marginBottom={2.5}
              >
                {user ? <CabinetNavigation role={user?.role} /> : null}
              </Box>
            </ContainerWithShadow>
            <Box className="section-cabinet__body">{children}</Box>
          </Box>
        </Container>
      </main>
    </>
  )
}

export default CabinetLayout
