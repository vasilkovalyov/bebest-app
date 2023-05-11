// libs
import { Fragment } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// material ui components
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'

// other utils
import pages from '@/constants/pages'
import { useAuthContext } from '@/context/auth-context'

// relate utils
import { INavigationProps } from './Navigation.type'

function Navigation({ menu }: INavigationProps) {
  return (
    <Stack
      component={'nav'}
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
      spacing={1}
      className="header__auth-list"
    >
      {menu.map((menuItem) => (
        <Fragment key={menuItem.id}>
          {menuItem.isAdminShow ? (
            <Box className="header__auth-list-item">
              <Link
                href={menuItem.path}
                className="header__auth-button font-semibold color-dark-blue-1"
              >
                {menuItem.title}
              </Link>
            </Box>
          ) : null}
        </Fragment>
      ))}
    </Stack>
  )
}

export default Navigation
