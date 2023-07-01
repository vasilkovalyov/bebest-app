// material ui components
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'

//custom components
import PreviewInfo from '@/components/Previews/PreviewInfo'

//relate util
import { IPreviewStudentSubjectsProps } from './PreviewStudentSubjects.type'

function PreviewStudentSubjects({ items }: IPreviewStudentSubjectsProps) {
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
          <Box marginBottom={items.length - 1 !== index ? 4 : 0}>
            <PreviewInfo heading="Subject" values={[item.subject_study]} />
            {item.level_mastery_subject ? (
              <PreviewInfo
                heading="Level of mastery"
                values={[item.level_mastery_subject]}
              />
            ) : null}
          </Box>
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

export default PreviewStudentSubjects
