// libs
import { Fragment } from 'react'

// material ui components
import Box from '@mui/material/Box'
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
              <Typography variant="subtitle1" className="font-normal">
                {item.title}
              </Typography>
              <Typography variant="subtitle2" marginBottom={2}>
                {item.name}
              </Typography>
            </Fragment>
          )
        }
        return null
      })}
    </Box>
  )
}

export default AccountInfo
