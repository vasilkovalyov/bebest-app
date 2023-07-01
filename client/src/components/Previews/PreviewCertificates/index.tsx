//libs
import dayjs from 'dayjs'

// material ui components
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'

//custom components
import PreviewInfo from '@/components/Previews/PreviewInfo'

//relate util
import { IPreviewCertificatesProps } from './PreviewCertificates.type'

function PreviewCertificates({ items }: IPreviewCertificatesProps) {
  if (!items.length) {
    return (
      <Typography variant="body1">
        No data. Click on Edit button to add information.
      </Typography>
    )
  }

  return (
    <>
      {items.map((item, index) => (
        <Box key={item._id}>
          <Stack
            key={item._id}
            marginBottom={items.length - 1 !== index ? 4 : 0}
            direction="row"
            gap={3}
          >
            <Box>
              <img src={item.image || ''} alt="image" width={140} />
            </Box>
            <Box>
              <PreviewInfo heading="Certificate name" values={[item.name]} />
              <PreviewInfo
                heading="Date"
                values={[dayjs(item.date).format('DD MMMM YYYY')]}
              />
            </Box>
          </Stack>
          {items.length - 1 !== index ? (
            <Box marginTop={3} marginBottom={3}>
              <Divider />
            </Box>
          ) : null}
        </Box>
      ))}
    </>
  )
}

export default PreviewCertificates
