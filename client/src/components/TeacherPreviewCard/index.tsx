// libs
import Link from 'next/link'
import cn from 'classnames'

// material ui components
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

// relate utils
import { ITeacherPreviewCardProps } from './TeacherPreviewCard.type'

function TeacherPreviewCard({
  _id,
  name,
  surname,
  avatar,
  about,
  className,
  personalInfoId,
}: ITeacherPreviewCardProps) {
  return (
    <Box className={cn('teacher-preview-card', className)}>
      <Box>
        <Avatar alt={`${name} ${surname}`} src={avatar || ''} />
        {personalInfoId?.personal_lessons?.price ? (
          <Typography>{personalInfoId?.personal_lessons?.price} $</Typography>
        ) : null}
        {personalInfoId?.personal_lessons?.duration ? (
          <Typography>
            {personalInfoId?.personal_lessons?.duration} hour
          </Typography>
        ) : null}
        {personalInfoId?.personal_lessons?.use_trial ? (
          <Button variant="contained" disabled>
            Trial lesson
          </Button>
        ) : null}
      </Box>
      <Box>
        <Typography variant="h5">
          <Link href={`/teachers/${_id}`}>
            {name} {surname}
          </Link>
        </Typography>
        {about ? (
          <>
            <Typography variant="body1">Brief description</Typography>
            <Typography variant="body2">{about}</Typography>
          </>
        ) : null}
      </Box>
    </Box>
  )
}

export default TeacherPreviewCard
