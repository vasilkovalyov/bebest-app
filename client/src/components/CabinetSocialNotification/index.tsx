// libs
import Link from 'next/link'

// material ui components
import Stack from '@mui/material/Stack'
import Badge from '@mui/material/Badge'

//custom components
import Icon from '@/components/Generic/Icon'
import { IconEnum } from '@/components/Generic/Icon/Icon.type'

// other utils
import profilePages from '@/constants/profile-pages'
import { UserRole } from '@/types/role'

// relate utils
import { ICabinetSocialNotificationProps } from './CabinetSocialNotification.type'

const getLinkByRole = (role: UserRole) => {
  return role !== 'company' ? profilePages.lessons : profilePages.courses
}

function CabinetSocialNotification({ role }: ICabinetSocialNotificationProps) {
  return (
    <Stack direction="row" gap={2} className="admin-social-notification">
      <Link
        href={getLinkByRole(role)}
        className="admin-social-notification__link color-dark-blue-1"
      >
        <Badge color="error">
          <Icon size={24} icon={IconEnum.UNIVERSTY_HAT} />
        </Badge>
      </Link>
      <Link
        href={profilePages.chats}
        className="admin-social-notification__link color-dark-blue-1"
      >
        <Badge color="error">
          <Icon size={20} icon={IconEnum.CHAT} />
        </Badge>
      </Link>
      <Link
        href="/"
        className="admin-social-notification__link color-dark-blue-1"
      >
        <Badge color="error">
          <Icon size={20} icon={IconEnum.BELL} />
        </Badge>
      </Link>
    </Stack>
  )
}

export default CabinetSocialNotification
