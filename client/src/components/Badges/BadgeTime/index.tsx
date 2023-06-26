//libs
import cn from 'classnames'

// material ui components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

//custom components
import Icon from '@/components/Generic/Icon'
import { IconEnum } from '@/types/icons'

//relate utils
import { BadgeTimeProps } from './BadgeTime.type'

//other utils
import colors from '@/constants/colors'
import getFormatDurationTime from '@/utils/date'

function BadgeTime({
  duration,
  className,
  startTime,
  endTime,
  time,
}: BadgeTimeProps) {
  return (
    <Box
      className={cn('badge badge--time', className)}
      style={{ backgroundColor: colors.primary_light_color }}
    >
      <Icon
        icon={IconEnum.CLOCK_CIRCULAR_OUTLINE}
        size={15}
        color={colors.primary}
        className="badge__icon"
      />
      <Typography className="badge__text font-semibold">
        {time ? time : null}
        {duration ? getFormatDurationTime(duration) : null}
        {startTime && endTime ? (
          <span>
            {startTime} - {endTime}
          </span>
        ) : null}
      </Typography>
    </Box>
  )
}

export default BadgeTime
