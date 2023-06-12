// material ui components
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'

//relate utils
import { IPreviewInfoProps } from './PreviewInfo.type'

function PreviewInfo({
  category,
  heading,
  values,
  marginBottom = 2,
}: IPreviewInfoProps) {
  return (
    <Box marginBottom={marginBottom}>
      {category ? (
        <Typography variant="h5" fontWeight={700} marginBottom={2}>
          {category}
        </Typography>
      ) : null}
      <Typography variant="body1" fontWeight={700} marginBottom={1}>
        {heading}
      </Typography>
      {values ? (
        <Stack direction="row" gap={1}>
          {values.map((item, index) => (
            <Typography
              key={index}
              variant="body1"
              className="font-normal"
              marginBottom={0}
            >
              {item}
              {index < values.length - 1 ? ',' : null}
            </Typography>
          ))}
        </Stack>
      ) : null}
    </Box>
  )
}

export default PreviewInfo
