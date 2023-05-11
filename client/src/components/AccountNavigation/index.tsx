// libs
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { destroyCookie } from 'nookies'

// custom hooks
import { useLogout } from '../../hooks/useLogout'

// material ui components
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'

//custom components
import Icon from '../Generic/Icon'

// other utils
import adminPages from '@/models/adminPages'

// relate utils
import { IAccountNavigationProps } from './AccountNavigation.type'

function AccountNavigation({ userName, role }: IAccountNavigationProps) {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const { logOut } = useLogout()

  function handleOpenUserMenu(event: React.MouseEvent<HTMLElement>) {
    setAnchorElUser(event.currentTarget)
  }

  function handleCloseUserMenu() {
    setAnchorElUser(null)
  }

  return (
    <Toolbar disableGutters className="account-navigation">
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open menu">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
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
          onClose={handleCloseUserMenu}
        >
          {adminPages.map((page) => {
            if (!page.role.length) {
              return (
                <MenuItem
                  key={page.id}
                  className="account-navigation__menu-item"
                >
                  {page.icon ? (
                    <Icon
                      size={16}
                      icon={page.icon}
                      className="account-navigation__menu-icon"
                    />
                  ) : null}
                  <Link
                    href={page.path}
                    className="account-navigation__menu-link"
                  >
                    {page.title}
                  </Link>
                </MenuItem>
              )
            }
            if (page.role.length > 0 && page.role.includes(role)) {
              return (
                <MenuItem
                  key={page.id}
                  className="account-navigation__menu-item"
                >
                  {page.icon ? (
                    <Icon
                      size={16}
                      icon={page.icon}
                      className="account-navigation__menu-icon"
                    />
                  ) : null}
                  <Link
                    href={page.path}
                    className="account-navigation__menu-link"
                  >
                    {page.title}
                  </Link>
                </MenuItem>
              )
            }
          })}
          <MenuItem className="account-navigation__menu-item" onClick={logOut}>
            <Typography className="account-navigation__menu-link">
              Log out
            </Typography>
          </MenuItem>
        </Menu>
      </Box>
    </Toolbar>
  )
}

export default AccountNavigation
