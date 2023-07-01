// libs
import Link from 'next/link'
import Image from 'next/image'

//redux
import { useAppSelector } from '@/redux/hooks'

// material ui components
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'

// custom components
import HeaderNavigation from '@/components/HeaderNavigation'
import HeaderToolbar from '@/components/HeaderToolbar'
import HeaderAuthNavigation from '@/components/HeaderAuthNavigation'
import AccountSocialNotification from '@/components/AccountSocialNotification'

// relate utils
import { menu } from './Header.model'

// other utils
import pages from '@/constants/pages'

function Header() {
  const { isAuth } = useAppSelector((state) => state.user)

  return (
    <header className="header">
      <Container maxWidth="xl" className="header__container">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Link href={pages.home} className="header__logo">
            <Image
              src="/images/logo.png"
              alt={'bebest logo'}
              width={100}
              height={30}
            />
          </Link>
          <HeaderNavigation menu={menu} />
          <Box>
            {!isAuth ? (
              <HeaderAuthNavigation />
            ) : (
              <Stack direction="row" alignItems="center">
                <Box marginRight={2}>
                  <AccountSocialNotification />
                </Box>
                <HeaderToolbar />
              </Stack>
            )}
          </Box>
        </Stack>
      </Container>
    </header>
  )
}

export default Header
