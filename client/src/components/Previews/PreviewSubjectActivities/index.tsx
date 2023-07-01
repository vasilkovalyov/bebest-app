// material ui components
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'

//custom components
import PreviewInfo from '@/components/Previews/PreviewInfo'

//relate utils
import { IPreviewSubjectActivitiesProps } from './PreviewSubjectActivities.type'

function PreviewSubjectActivities({ items }: IPreviewSubjectActivitiesProps) {
  if (!items.length) {
    return (
      <Typography variant="body1">
        No data. Click on Edit button to add information.
      </Typography>
    )
  }

  return (
    <>
      {items.map((field, index) => (
        <Box key={field._id} marginBottom={2}>
          <PreviewInfo heading="Activity" values={[field.subject]} />
          {/* <PreviewInfo heading="Skills" values={field.skills} /> */}
          {items.length !== 1 && items.length - 1 !== index ? (
            <Box marginTop={3} marginBottom={3}>
              <Divider />
            </Box>
          ) : null}
        </Box>
      ))}
    </>
  )
}

export default PreviewSubjectActivities
