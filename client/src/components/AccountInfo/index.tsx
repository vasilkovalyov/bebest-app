// libs
import { Fragment } from 'react'

// material ui components
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// relate utils
import { IAccountInfoProps } from './AccountInfo.type'

function AccountInfo({
  items,
  directionItems = 'row',
  gap = 2,
  marginBottom = 2,
}: IAccountInfoProps) {
  return (
    <Box>
      {items.map((item, index) => {
        if (item.name) {
          return (
            <Box key={index} marginBottom={marginBottom}>
              <Stack direction={directionItems} gap={gap}>
                <Typography
                  variant="subtitle1"
                  className="font-normal"
                  marginBottom={0}
                >
                  {item.title}
                </Typography>
                {directionItems !== 'column' ? (
                  <Box component="span"> - </Box>
                ) : null}
                {item.name ? (
                  <Typography variant="body2" marginBottom={0}>
                    {item.name}
                  </Typography>
                ) : null}
              </Stack>
            </Box>
          )
        }
        return null
      })}
    </Box>
  )
}

export default AccountInfo
