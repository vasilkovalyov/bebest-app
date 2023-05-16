// libs
import { useState } from 'react'
import cn from 'classnames'

// custom hooks
import { useLogout } from '@/hooks/useLogout'

// material ui components
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'

//custom components
import CabinetNavigationMenuPages from '@/components/CabinetNavigationMenuPages'
import { useAuthContext } from '@/context/auth-context'

// relate utils
import { IAccountNavigationProps } from './HeaderToolbar.type'

function HeaderToolbar({ classNameMenu }: IAccountNavigationProps) {
  const { user } = useAuthContext()
  const { logOut } = useLogout()
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  return (
    <Toolbar disableGutters className="header-toolbar">
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open menu">
          <IconButton
            onClick={(e: React.MouseEvent<HTMLElement>) =>
              setAnchorElUser(e.currentTarget)
            }
            sx={{ p: 0 }}
          >
            <Avatar alt={user?.name} />
          </IconButton>
        </Tooltip>
        <Menu
          className={cn('header-toolbar__menu', classNameMenu)}
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
          <CabinetNavigationMenuPages />
          <MenuItem onClick={logOut}>
            <Button variant="text">Log out</Button>
          </MenuItem>
        </Menu>
      </Box>
    </Toolbar>
  )
}

export default HeaderToolbar
