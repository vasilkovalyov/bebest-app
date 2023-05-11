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
  paddingSize,
}: ContainerWithShadowProps) {
  const sizeClass = cn({
    'container-with-shadow--paddings-sm': paddingSize === 'sm',
  })
  return (
    <Box className={cn('container-with-shadow', sizeClass, className)}>
      {children}
    </Box>
  )
}

export default ContainerWithShadow
