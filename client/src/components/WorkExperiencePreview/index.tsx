//libs
import dayjs from 'dayjs'

// material ui components
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'

//custom components
import PreviewInfo from '@/components/PreviewInfo'

//relate util
import { IWorkExperiencePreviewProps } from './WorkExperiencePreview.type'

function WorkExperiencePreview({ items }: IWorkExperiencePreviewProps) {
  return (
    <>
      {items.length ? (
        <Box>
          {items.map((item, index) => (
            <Box key={item._id}>
              <Box
                key={item._id}
                marginBottom={items.length - 1 !== index ? 4 : 0}
              >
                <PreviewInfo heading="Company" values={[item.company_name]} />
                {item.description ? (
                  <PreviewInfo
                    heading="Description"
                    values={[item.description]}
                  />
                ) : null}
                <Stack direction="row" gap={2}>
                  <Box>
                    <Typography
                      variant="body1"
                      fontWeight={700}
                      marginBottom={1}
                    >
                      Start date
                    </Typography>
                    <Typography
                      variant="body1"
                      className="font-normal"
                      marginBottom={0}
                    >
                      {dayjs(item.startDate).format('MMMM YYYY')}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="body1"
                      fontWeight={700}
                      marginBottom={1}
                    >
                      End Date
                    </Typography>
                    <Typography
                      variant="body1"
                      className="font-normal"
                      marginBottom={0}
                    >
                      {item.isStillWorking
                        ? 'Still working'
                        : dayjs(item.endDate).format('MMMM YYYY')}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
              {items.length - 1 !== index ? (
                <Box marginTop={3} marginBottom={3}>
                  <Divider />
                </Box>
              ) : null}
            </Box>
          ))}
        </Box>
      ) : (
        <Typography variant="body1">
          No data. Click on Edit button to add information.
        </Typography>
      )}
    </>
  )
}

export default WorkExperiencePreview
