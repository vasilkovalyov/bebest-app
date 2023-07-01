// material ui components
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// relate utils
import { IPreviewUserAccountProps } from './PreviewUserAccount.type'

function PreviewUserAccount({
  items,
  directionItems = 'row',
  gap = 2,
  marginBottom = 2,
}: IPreviewUserAccountProps) {
  return (
    <>
      {items.map((item, index) => {
        if (!item.name) return null

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
      })}
    </>
  )
}

export default PreviewUserAccount
