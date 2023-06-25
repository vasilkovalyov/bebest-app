// libs
import Link from 'next/link'
import cn from 'classnames'

// material ui components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

//custom components
import Icon from '@/components/Generic/Icon'
import { IconEnum } from '@/types/icons'

//relate utils
import { ILessonTypeBoxProps } from './LessonTypeBox.type'

//other utils
import colors from '@/constants/colors'

function LessonTypeBox({
  title,
  text,
  type,
  onClick,
  className,
}: ILessonTypeBoxProps) {
  return (
    <Box
      className={cn('lesson-type-box', className)}
      onClick={() => onClick(type)}
      padding={2}
    >
      <Icon
        icon={IconEnum.STACK}
        color={colors.primary}
        size={24}
        className="lesson-type-box__icon"
      />
      <Box className="lesson-type-box__content">
        <Typography variant="h6" className="lesson-type-box__title">
          {title}
        </Typography>
        <Typography variant="subtitle2" marginBottom={0} fontWeight={400}>
          {text}
        </Typography>
      </Box>
    </Box>
  )
}

export default LessonTypeBox
