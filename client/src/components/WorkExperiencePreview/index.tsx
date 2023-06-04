// material ui components
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'

//custom components
import PreviewInfo from '@/components/PreviewInfo'

//relate util
import { IWorkExperiencePreviewProps } from './WorkExperiencePreview.type'

function WorkExperiencePreview({ items }: IWorkExperiencePreviewProps) {
  return (
    <Box>
      {items.length ? (
        <Box>
          {items.map((item) => (
            <Box key={item._id}>
              <PreviewInfo heading="Company" values={[item.company_name]} />
              {item.description ? (
                <PreviewInfo
                  heading="Description"
                  values={[item.description]}
                />
              ) : null}
              <Stack direction="row" gap={2}>
                <Box>
                  <Typography variant="body1" fontWeight={700} marginBottom={1}>
                    Start date
                  </Typography>
                  <Typography
                    variant="body1"
                    className="font-normal"
                    marginBottom={0}
                  >
                    {item.startDate}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body1" fontWeight={700} marginBottom={1}>
                    End Date
                  </Typography>
                  <Typography
                    variant="body1"
                    className="font-normal"
                    marginBottom={0}
                  >
                    {item.endDate}
                    {item.isStillWorking ? 'Still working' : null}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          ))}
        </Box>
      ) : (
        <Typography variant="body1">
          No data. Click on Edit button to add information.
        </Typography>
      )}
    </Box>
  )
}

export default WorkExperiencePreview
