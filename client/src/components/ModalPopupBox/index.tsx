import React from 'react'
import cn from 'classnames'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import Icon from '@/components/Generic/Icon'
import { IconEnum } from '@/types/icons'

import { ModalCardProps } from './ModalPopupBox.type'

function ModalPopupBox({
  children,
  className,
  type,
  onHandleClose,
}: ModalCardProps) {
  const typeClassName = cn({
    'modal-card-full': type === 'full',
    'modal-card-default': type === 'default',
  })
  return (
    <Box
      className={cn('modal-card', typeClassName, className)}
      alignItems="center"
      justifyContent="center"
    >
      <Button className="modal-card__button-close" onClick={onHandleClose}>
        <Icon
          icon={IconEnum.CROSS_OUTLINE}
          size={20}
          color="#000000"
          className="modal-card__button-close-icon"
        />
      </Button>
      <Box className="modal-card__body">{children}</Box>
    </Box>
  )
}

export default ModalPopupBox
