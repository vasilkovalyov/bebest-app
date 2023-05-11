// libs
import { useState } from 'react'
import Link from 'next/link'

// custom hooks
import { useLogout } from '@/hooks/useLogout'

// material ui components
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import Badge from '@mui/material/Badge'

//custom components
import Icon from '@/components/Generic/Icon'
import { IconEnum } from '@/components/Generic/Icon/Icon.type'
import AdminNavigation from '@/components/AdminNavigation'

// other utils
import adminPages from '@/models/adminPages'
import profilePages from '@/constants/profile-pages'
import { UserRole } from '@/types/role'

// relate utils
import { IAccountNavigationProps } from './AccountNavigation.type'

const getLinkByRole = (role: UserRole) => {
  return role !== 'company' ? profilePages.lessons : profilePages.courses
}

function AccountNavigation({ userName, role }: IAccountNavigationProps) {
  const { logOut } = useLogout()
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  return (
    <Stack direction="row" alignItems="center">
      <Stack direction="row" marginRight={4} gap={2}>
        <Link href={getLinkByRole(role)} className="color-dark-blue-1">
          <Badge color="error">
            <Icon size={24} icon={IconEnum.UNIVERSTY_HAT} />
          </Badge>
        </Link>
        <Link href={profilePages.chats} className="color-dark-blue-1">
          <Badge color="error">
            <Icon size={20} icon={IconEnum.CHAT} />
          </Badge>
        </Link>
        <Link href="/" className="color-dark-blue-1">
          <Badge color="error">
            <Icon size={20} icon={IconEnum.BELL} />
          </Badge>
        </Link>
      </Stack>
      <Toolbar disableGutters className="account-navigation">
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open menu">
            <IconButton
              onClick={(e: React.MouseEvent<HTMLElement>) =>
                setAnchorElUser(e.currentTarget)
              }
              sx={{ p: 0 }}
            >
              <Avatar alt={userName} />
            </IconButton>
          </Tooltip>
          <Menu
            className="account-navigation__menu"
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={() => setAnchorElUser(null)}
          >
            <AdminNavigation role={role} />
            <MenuItem
              className="account-navigation__menu-item"
              onClick={logOut}
            >
              <Typography className="account-navigation__menu-link">
                Log out
              </Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </Stack>
  )
}

export default AccountNavigation
