// libs
import { Fragment } from 'react'
import Link from 'next/link'

// material ui components
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'

// relate utils
import { INavigationProps } from './Navigation.type'

function Navigation({ menu }: INavigationProps) {
  return (
    <Stack component={'nav'} direction="row" className="header-navigation">
      {menu.map((menuItem) => (
        <Fragment key={menuItem.id}>
          {menuItem.isAdminShow ? (
            <Box className="header-navigation__item">
              <Link
                href={menuItem.path}
                className="header-navigation__link color-dark-blue-1 font-medium"
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
