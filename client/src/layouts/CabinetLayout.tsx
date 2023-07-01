// libs
import Link from 'next/link'
import Head from 'next/head'

//redux
import { useAppSelector } from '@/redux/hooks'

// types
import { UserRole } from '@/types/role'

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

function LayoutProgressAccount({ role }: { role: UserRole }) {
  if (role !== 'teacher') return null
  return (
    <Box paddingTop={2} paddingX={3} marginBottom={2}>
      <ProgressAccount />
      <Divider />
    </Box>
  )
}

function CabinetLayout({
  currentPageTitle,
  children,
}: {
  currentPageTitle?: string
  children?: React.ReactNode
}) {
  const teacherStore = useAppSelector((store) => store.teacher.user)

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
              {teacherStore.role ? (
                <LayoutProgressAccount role={teacherStore.role} />
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
