// libs
import cn from 'classnames'

// material ui components
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

//custom components
import Icon from '@/components/Generic/Icon'
import { IconEnum } from '@/types/icons'

// relate utils
import { IUserListLessonProps } from './UserListLesson'

function UserListLesson({
  users,
  className,
  onHandleDelete,
}: IUserListLessonProps) {
  return (
    <Box className={cn('user-list-lesson', className)}>
      {users.map((user) => (
        <Stack
          key={user._id}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Avatar
            alt={user.fullname}
            src={user.avatar || ''}
            style={{ width: '30px', height: '30px' }}
          />
          <Typography marginBottom={0} marginX={2} variant="body1">
            {user.fullname}
          </Typography>
          <Box marginLeft="auto">
            <Button size="small" onClick={() => onHandleDelete(user)}>
              <Icon icon={IconEnum.BIN} size={14} />
            </Button>
          </Box>
        </Stack>
      ))}
    </Box>
  )
}

export default UserListLesson
