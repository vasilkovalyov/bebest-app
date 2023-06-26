//libs
import cn from 'classnames'

// material ui components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

//custom components
import Icon from '@/components/Generic/Icon'
import { IconEnum } from '@/types/icons'

//relate utils
import { BadgeExperienceProps } from './BadgeExperience.type'

//other utils
import colors from '@/constants/colors'

function BadgeExperience({ years, className }: BadgeExperienceProps) {
  return (
    <Box
      className={cn('badge badge-experience', className)}
      style={{ backgroundColor: colors.yellow_light_color }}
    >
      <Icon
        icon={IconEnum.STAR_EMPTY}
        size={15}
        color={colors.yellow_color}
        className="badge__icon"
      />
      <Typography className="badge__text">
        Expirience:
        <span className="font-semibold">
          {years} {years > 1 ? 'years' : 'yeat'}
        </span>
      </Typography>
    </Box>
  )
}

export default BadgeExperience
