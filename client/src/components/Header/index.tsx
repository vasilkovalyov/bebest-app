// libs
import Link from 'next/link'
import Image from 'next/image'

// material ui components
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'

// custom components
import Navigation from '../Navigation'
import AccountNavigation from '../HeaderToolbar'
import HeaderAuthNavigation from '@/components/HeaderAuthNavigation'
import CabinetSocialNotification from '@/components/CabinetSocialNotification'

// other utils
import pages from '@/constants/pages'
import { useAuthContext } from '@/context/auth-context'
import { menu } from './Header.model'

function Header() {
  const { user } = useAuthContext()

  return (
    <header className="header">
      <Container maxWidth="xl" className="header__container">
        <Box className="header__left">
          <Link href={pages.home} className="header__logo">
            <Image
              src="/images/logo.png"
              alt={'bebest logo'}
              width={100}
              height={30}
            />
          </Link>
        </Box>
        <Box className="header__center">
          <Navigation menu={menu} />
        </Box>
        <Box className="header__right">
          {!user ? (
            <HeaderAuthNavigation />
          ) : (
            <Stack direction="row" alignItems="center">
              <Box marginRight={2}>
                <CabinetSocialNotification role={user.role} />
              </Box>
              <AccountNavigation
                role={user.role}
                userName={user?.name}
                classNameMenu="admin-navigation-menu--header-menu"
              />
            </Stack>
          )}
        </Box>
      </Container>
    </header>
  )
}

export default Header
