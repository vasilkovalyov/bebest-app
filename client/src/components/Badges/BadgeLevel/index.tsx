//libs
import cn from 'classnames'

// material ui components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

//custom components
import Icon from '@/components/Generic/Icon'
import { IconEnum } from '@/types/icons'

//relate utils
import { BadgeLevelProps } from './BadgeLevel.type'

//other utils
import colors from '@/constants/colors'

function BadgeLevel({ level, className }: BadgeLevelProps) {
  return (
    <Box
      className={cn('badge badge--level', className)}
      style={{ backgroundColor: colors.green_light_color }}
    >
      <Icon
        icon={IconEnum.UNIVERSTY_HAT}
        size={15}
        color={colors.green_color}
        className="badge__icon"
      />
      <Typography className="badge__text font-semibold">{level}</Typography>
    </Box>
  )
}

export default BadgeLevel
