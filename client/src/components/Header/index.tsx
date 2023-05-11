// libs
import Link from 'next/link'
import Image from 'next/image'

// material ui components
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'

// custom components
import Navigation from '../Navigation'
import AuthNavigation from '../AuthNavigation'
import AccountNavigation from '../AccountNavigation'

// other utils
import pages from '@/constants/pages'
import { useAuthContext } from '@/context/auth-context'
import { menu } from './Header.model'

function Header() {
  const { user } = useAuthContext()

  return (
    <header className="header">
      <Container className="header__container">
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
            <AuthNavigation />
          ) : (
            <AccountNavigation role={user.role} userName={user?.name} />
          )}
        </Box>
      </Container>
    </header>
  )
}

export default Header
