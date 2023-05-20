// libs
import { Fragment } from 'react'

// material ui components
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// relate utils
import { IAccountInfoProps } from './AccountInfo.type'

function AccountInfo({ items }: IAccountInfoProps) {
  return (
    <Box>
      {items.map((item, index) => {
        if (item.name) {
          return (
            <Fragment key={index}>
              <Stack direction="row" gap={2}>
                <Typography variant="subtitle1" className="font-normal">
                  {item.title}
                </Typography>
                <Box component="span"> - </Box>
                <Typography variant="body2" marginBottom={2}>
                  {item.name}
                </Typography>
              </Stack>
            </Fragment>
          )
        }
        return null
      })}
    </Box>
  )
}

export default AccountInfo
