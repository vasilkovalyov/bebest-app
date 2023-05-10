// libs
import React from 'react'
import cn from 'classnames'

// material ui components
import Box from '@mui/material/Box'

// relate utils
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
