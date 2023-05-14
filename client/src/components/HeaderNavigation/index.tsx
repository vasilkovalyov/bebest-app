// libs
import { Fragment } from 'react'
import Link from 'next/link'

// material ui components
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// relate utils
import { IHeaderNavigationProps } from './HeaderNavigation.type'

function HeaderNavigation({ menu }: IHeaderNavigationProps) {
  return (
    <Stack component={'nav'} className="header-navigation">
      <Box component="ul" className="header-navigation__list">
        {menu.map((menuItem) => (
          <Fragment key={menuItem.id}>
            {menuItem.isCabinetShow ? (
              <Box component="li" className="header-navigation__item">
                <Link
                  href={menuItem.path}
                  className="header-navigation__link color-grey-dark font-medium text-underline-none"
                >
                  <Typography component="span" variant="subtitle2">
                    {menuItem.title}
                  </Typography>
                </Link>
              </Box>
            ) : null}
          </Fragment>
        ))}
      </Box>
    </Stack>
  )
}

export default HeaderNavigation
