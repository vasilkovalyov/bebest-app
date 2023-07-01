// libs
import Link from 'next/link'

// redux
import { useAppSelector } from '@/redux/hooks'

// types
import { UserRole } from '@/types/role'
import { IconEnum } from '@/types/icons'

// material ui components
import Stack from '@mui/material/Stack'
import Badge from '@mui/material/Badge'

// custom components
import Icon from '@/components/Generic/Icon'

// other utils
import profilePages from '@/constants/profile-pages'

const getLinkByRole = (role: UserRole) => {
  return role !== 'company' ? profilePages.lessons : profilePages.courses
}

function AccountSocialNotification() {
  const user = useAppSelector((state) => state.user.user)

  return (
    <Stack direction="row" gap={2} className="account-social-notification">
      {user.role ? (
        <Link
          href={getLinkByRole(user.role)}
          className="account-social-notification__link color-grey-dark"
        >
          <Badge color="error">
            <Icon size={24} icon={IconEnum.UNIVERSTY_HAT} />
          </Badge>
        </Link>
      ) : null}
      <Link
        href={profilePages.chats}
        className="account-social-notification__link color-grey-dark"
      >
        <Badge color="error">
          <Icon size={20} icon={IconEnum.CHAT} />
        </Badge>
      </Link>
      <Link
        href="/"
        className="account-social-notification__link color-grey-dark"
      >
        <Badge color="error">
          <Icon size={20} icon={IconEnum.BELL} />
        </Badge>
      </Link>
    </Stack>
  )
}

export default AccountSocialNotification
