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
import { useAuthContext } from '@/context/auth-context'

const getLinkByRole = (role: UserRole) => {
  return role !== 'company' ? profilePages.lessons : profilePages.courses
}

function AccountSocialNotification() {
  const { user } = useAuthContext()

  return (
    <Stack direction="row" gap={2} className="account-social-notification">
      {user ? (
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
