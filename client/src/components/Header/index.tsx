// libs
import Link from 'next/link'
import Image from 'next/image'

// material ui components
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'

// custom components
import HeaderNavigation from '../HeaderNavigation'
import HeaderToolbar from '../HeaderToolbar'
import HeaderAuthNavigation from '@/components/HeaderAuthNavigation'
import AccountSocialNotification from '@/components/AccountSocialNotification'

// other utils
import pages from '@/constants/pages'
import { useAuthContext } from '@/context/auth-context'
import { menu } from './Header.model'

function Header() {
  const { user } = useAuthContext()

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
            {!user ? (
              <HeaderAuthNavigation />
            ) : (
              <Stack direction="row" alignItems="center">
                <Box marginRight={2}>
                  <AccountSocialNotification role={user.role} />
                </Box>
                <HeaderToolbar role={user.role} userName={user?.name} />
              </Stack>
            )}
          </Box>
        </Stack>
      </Container>
    </header>
  )
}

export default Header
