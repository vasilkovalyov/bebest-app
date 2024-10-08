import Link from 'next/link'
import Image from 'next/image'

import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'

import pages from '@/constants/pages'
import { useAuthContext } from '@/context/auth-context'

function Header() {
  const { user } = useAuthContext()

  return (
    <header className="header">
      <Container className="header__container">
        <Link href={pages.home} className="header__logo">
          <Image
            src="/images/logo.png"
            alt={'bebest logo'}
            width={100}
            height={30}
          />
        </Link>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={1}
          className="header__auth-list"
        >
          {user ? (
            <Box className="header__auth-list-item">
              <Link
                href={pages.admin}
                className="header__auth-button font-semibold color-dark-blue-1"
              >
                Admin
              </Link>
            </Box>
          ) : (
            <>
              <Box className="header__auth-list-item">
                <Link
                  href={pages.login}
                  className="header__auth-button font-semibold color-dark-blue-1"
                >
                  Sign in
                </Link>
              </Box>
              <Box className="header__auth-list-item">
                <Link
                  href={pages.registration}
                  className="header__auth-button font-semibold color-dark-blue-1"
                >
                  Sign up
                </Link>
              </Box>
            </>
          )}
        </Stack>
      </Container>
    </header>
  )
}

export default Header
