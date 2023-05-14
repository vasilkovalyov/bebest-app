// libs
import Link from 'next/link'
import { useRouter } from 'next/router'
import cn from 'classnames'

// material ui components
import MenuItem from '@mui/material/MenuItem'

//custom components
import Icon from '@/components/Generic/Icon'

// other utils
import cabinetPages from '@/models/cabinetPages'

// relate utils
import { ICabinetNavigationMenuPagesProps } from './CabinetNavigationMenuPages.type'

function CabinetNavigationMenuPages({
  role,
}: ICabinetNavigationMenuPagesProps) {
  const router = useRouter()

  return (
    <>
      {cabinetPages.map((page) => {
        if (!page.role.length) {
          return (
            <MenuItem key={page.id}>
              <Link
                href={page.path}
                className={cn({
                  active: router.pathname === page.path,
                })}
              >
                {page.icon ? <Icon size={16} icon={page.icon} /> : null}
                {page.title}
              </Link>
            </MenuItem>
          )
        }
        if (page.role.length > 0 && page.role.includes(role)) {
          return (
            <MenuItem key={page.id}>
              <Link
                href={page.path}
                className={cn({
                  active: router.pathname === page.path,
                })}
              >
                {page.icon ? <Icon size={16} icon={page.icon} /> : null}
                {page.title}
              </Link>
            </MenuItem>
          )
        }
      })}
    </>
  )
}

export default CabinetNavigationMenuPages
