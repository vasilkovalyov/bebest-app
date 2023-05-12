// libs
import Link from 'next/link'
import { useRouter } from 'next/router'
import cn from 'classnames'

// material ui components
import MenuItem from '@mui/material/MenuItem'

//custom components
import Icon from '@/components/Generic/Icon'

// other utils
import adminPages from '@/models/adminPages'

// relate utils
import { IAdminNavigationMenuPagesProps } from './AdminNavigationMenuPages.type'

function AdminNavigationMenuPages({ role }: IAdminNavigationMenuPagesProps) {
  const router = useRouter()

  return (
    <>
      {adminPages.map((page) => {
        if (!page.role.length) {
          return (
            <MenuItem key={page.id} className="admin-navigation-menu__item">
              <Link
                href={page.path}
                className={cn('admin-navigation-menu__link', {
                  'admin-navigation-menu__link--active':
                    router.pathname === page.path,
                })}
              >
                {page.icon ? (
                  <Icon
                    size={16}
                    icon={page.icon}
                    className="admin-navigation-menu__icon"
                  />
                ) : null}
                {page.title}
              </Link>
            </MenuItem>
          )
        }
        if (page.role.length > 0 && page.role.includes(role)) {
          return (
            <MenuItem key={page.id} className="admin-navigation-menu__item">
              <Link
                href={page.path}
                className={cn('admin-navigation-menu__link', {
                  'admin-navigation-menu__link--active':
                    router.pathname === page.path,
                })}
              >
                {page.icon ? (
                  <Icon
                    size={16}
                    icon={page.icon}
                    className="admin-navigation-menu__icon"
                  />
                ) : null}
                {page.title}
              </Link>
            </MenuItem>
          )
        }
      })}
    </>
  )
}

export default AdminNavigationMenuPages
