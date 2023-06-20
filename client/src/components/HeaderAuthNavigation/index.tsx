// libs
import Link from 'next/link'

// material ui components
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

// custom components
import Icon from '@/components/Generic/Icon'
import { IconEnum } from '@/types/icons'

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
        <Box display="inline-flex" alignItems="center" marginRight={1}>
          <Icon
            size={16}
            color={colors.primary}
            icon={IconEnum.PERSON}
            className="header-auth-navigation__item-icon"
          />
        </Box>
        <Link
          href={pages.login}
          className="header-auth-navigation__item-link font-medium color-grey-dark text-underline-none"
        >
          <Typography component="span">Sign in</Typography>
        </Link>
      </Box>
      <Box className="header-auth-navigation__item">
        <Link
          href={pages.registration}
          className="header-auth-navigation__item-link font-medium color-grey-dark text-underline-none"
        >
          <Typography component="span">Sign up</Typography>
        </Link>
      </Box>
    </Stack>
  )
}

export default HeaderAuthNavigation
