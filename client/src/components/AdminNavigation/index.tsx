// libs
import Link from 'next/link'

// material ui components
import MenuItem from '@mui/material/MenuItem'

//custom components
import Icon from '@/components/Generic/Icon'
import { IconEnum } from '@/components/Generic/Icon/Icon.type'

// other utils
import adminPages from '@/models/adminPages'
import profilePages from '@/constants/profile-pages'
import { UserRole } from '@/types/role'

// relate utils
import { IAdminNavigationProps } from './AdminNavigation.type'

function AdminNavigation({ role }: IAdminNavigationProps) {
  return (
    <>
      {adminPages.map((page) => {
        if (!page.role.length) {
          return (
            <MenuItem key={page.id} className="account-navigation__menu-item">
              {page.icon ? (
                <Icon
                  size={16}
                  icon={page.icon}
                  className="account-navigation__menu-icon"
                />
              ) : null}
              <Link href={page.path} className="account-navigation__menu-link">
                {page.title}
              </Link>
            </MenuItem>
          )
        }
        if (page.role.length > 0 && page.role.includes(role)) {
          return (
            <MenuItem key={page.id} className="account-navigation__menu-item">
              {page.icon ? (
                <Icon
                  size={16}
                  icon={page.icon}
                  className="account-navigation__menu-icon"
                />
              ) : null}
              <Link href={page.path} className="account-navigation__menu-link">
                {page.title}
              </Link>
            </MenuItem>
          )
        }
      })}
    </>
  )
}

export default AdminNavigation
