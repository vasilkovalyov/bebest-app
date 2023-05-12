// libs
import Link from 'next/link'

// material ui components
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'

// custom components
import Icon from '@/components/Generic/Icon'
import { IconEnum } from '@/components/Generic/Icon/Icon.type'

// other utils
import pages from '@/constants/pages'
import colors from '@/constants/colors'

function HeaderAuthNavigation() {
  return (
    <Stack
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
      spacing={1}
      className="header-auth-navigation"
    >
      <Box className="header-auth-navigation__item">
        <Icon
          size={16}
          color={colors.primary}
          icon={IconEnum.PERSON}
          className="header-auth-navigation__item-icon"
        />
        <Link
          href={pages.login}
          className="header-auth-navigation__item-link font-semibold color-dark-blue-1"
        >
          Sign in
        </Link>
      </Box>
      <Box className="header-auth-navigation__item">
        <Link
          href={pages.registration}
          className="header-auth-navigation__item-link font-semibold color-dark-blue-1"
        >
          Sign up
        </Link>
      </Box>
    </Stack>
  )
}

export default HeaderAuthNavigation
