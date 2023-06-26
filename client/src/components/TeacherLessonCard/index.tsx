//libs
import Link from 'next/link'
import cn from 'classnames'
import dayjs from 'dayjs'

// material ui components
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'

//custom components
import PreviewInfo from '@/components/Previews/PreviewInfo'
import BadgeDate from '@/components/Badges/BadgeDate'
import BadgeTime from '@/components/Badges/BadgeTime'
import Icon from '@/components/Generic/Icon'
import { IconEnum } from '@/types/icons'

//relate util
import { ITeacherLessonCardProps } from './TeacherLessonCard.type'

//other utils
import { pageRoutesPrivate } from '@/constants/page-routes'
import colors from '@/constants/colors'

function TeacherLessonCard({
  _id,
  max_users,
  start_date,
  subject,
  time_start,
  topic,
  type,
  duration_months,
  duration_time,
  registeredCount = 0,
  className,
}: ITeacherLessonCardProps) {
  return (
    <Box
      position="relative"
      className={cn('teacher-lesson-card', className)}
      marginBottom={2}
    >
      <Typography
        variant="h5"
        className="teacher-lesson-card__heading"
        marginBottom={1}
      >
        {topic}
      </Typography>
      <Typography
        marginBottom={2}
        variant="h6"
        className="teacher-lesson-card__subject"
      >
        {subject.subject}
      </Typography>
      <Typography variant="subtitle2">Type lesson - {type}</Typography>
      <Stack
        direction="row"
        spacing={2}
        marginBottom={2}
        alignContent="baseline"
      >
        <Stack direction="row" gap={1}>
          <Icon
            icon={IconEnum.CALENDAR}
            size={20}
            color={colors.blue}
            className="badge__icon"
          />
          <Box>
            <Typography variant="subtitle1" marginBottom={0.5}>
              Start date
            </Typography>
            <Typography variant="subtitle2">
              {dayjs(start_date).format('DD MMM YYYY')}
              {' | '}
              {time_start &&
                new Date(time_start).toLocaleTimeString().slice(0, 5)}
            </Typography>
          </Box>
        </Stack>
        <Stack direction="row" gap={1}>
          <Icon
            icon={IconEnum.CLOCK_CIRCULAR_OUTLINE}
            size={20}
            color={colors.blue}
            className="badge__icon"
          />
          <Box>
            <Typography variant="subtitle1" marginBottom={0.5}>
              Duration
            </Typography>
            <Typography variant="subtitle2">
              {duration_time ? duration_time : null}
              {duration_months
                ? `${
                    +duration_months > 1
                      ? duration_months + ' months'
                      : duration_months + ' month'
                  }`
                : null}
            </Typography>
          </Box>
        </Stack>
      </Stack>
      <Stack direction="row" spacing={1}>
        <Icon
          icon={IconEnum.INFO_CIRCULAR_OUTLINE}
          size={18}
          color={colors.blue}
        />
        <Typography>
          <Typography component="strong" variant="body2">
            {registeredCount}
          </Typography>{' '}
          more participant{registeredCount > 1 ? 's' : ''} out of{' '}
          <Typography component="strong" variant="body2">
            {max_users}
          </Typography>{' '}
          are expected
        </Typography>
      </Stack>
      <Box position="absolute" top={20} right={20}>
        <Link
          href={`/${pageRoutesPrivate.cabinetUpdateLesson}/${_id}`}
          className="teacher-lesson-card__edit"
        >
          <Icon icon={IconEnum.EDIT} size={18} color={colors.black_color} />
        </Link>
      </Box>
    </Box>
  )
}

export default TeacherLessonCard
