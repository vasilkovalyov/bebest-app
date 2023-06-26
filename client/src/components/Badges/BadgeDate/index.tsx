//libs
import cn from 'classnames'
import dayjs from 'dayjs'

// material ui components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

//custom components
import Icon from '@/components/Generic/Icon'
import { IconEnum } from '@/types/icons'

//relate utils
import { BadgeDateProps } from './BadgeDate.type'

//other utils
import colors from '@/constants/colors'

function BadgeDate({ date, className }: BadgeDateProps) {
  return (
    <Box
      className={cn('badge badge--date', className)}
      style={{ backgroundColor: colors.green_light_color }}
    >
      <Icon
        icon={IconEnum.CALENDAR}
        size={15}
        color={colors.green_color}
        className="badge__icon"
      />
      <Typography className="badge__text font-semibold">
        {dayjs(date).format('DD MMM YYYY')}
      </Typography>
    </Box>
  )
}

export default BadgeDate
