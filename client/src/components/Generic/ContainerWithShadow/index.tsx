import React from 'react'
import cn from 'classnames'
import Box from '@mui/material/Box'
import { ContainerWithShadowProps } from './ContainerWithShadow.type'

function ContainerWithShadow({
  className,
  children,
}: ContainerWithShadowProps) {
  return (
    <Box className={cn('container-with-shadow', className)}>{children}</Box>
  )
}

export default ContainerWithShadow
