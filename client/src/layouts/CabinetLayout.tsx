//redux
import { useAppSelector } from '@/redux/hooks'

import Link from 'next/link'
import Head from 'next/head'

// material ui components
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

// custom components
import Header from '@/components/Header'
import ContainerWithShadow from '@/components/Generic/ContainerWithShadow'
import CabinetNavigation from '@/components/CabinetNavigationMenuPages'
import CabinetSidebarUserInfo from '@/components/CabinetSidebarUserInfo'
import ProgressAccount from '@/components/ProgressAccount'

// other utils
import profilePages from '../constants/profile-pages'

function CabinetLayout({
  currentPageTitle,
  children,
}: {
  currentPageTitle?: string
  children?: React.ReactNode
}) {
  const userStore = useAppSelector((store) => store.user.user)

  return (
    <>
      <Head>
        <title>LearnLangPlatform - Cabinet</title>
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
              <CabinetSidebarUserInfo />
              {userStore.role === 'teacher' &&
              userStore.progress_account.profile_progress ? (
                <Box paddingTop={2} paddingX={3} marginBottom={2}>
                  <ProgressAccount />
                  <Divider />
                </Box>
              ) : null}
              <Box
                component="ul"
                className="cabinet-sidebar-menu"
                marginBottom={2.5}
              >
                <CabinetNavigation />
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
