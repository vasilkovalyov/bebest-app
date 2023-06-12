// material ui components
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

//custom components
import PreviewInfo from '@/components/Previews/PreviewInfo'

//relate utils
import { IPreviewTeacherCostPersonalLessonsProps } from './PreviewTeacherCostPersonalLessons.type'
import { getTrialLessonResult } from './PreviewTeacherCostPersonalLessons.utils'

function PreviewTeacherCostPersonalLessons({
  data,
}: IPreviewTeacherCostPersonalLessonsProps) {
  return (
    <>
      {data ? (
        <Box>
          <PreviewInfo
            category="Private lessons"
            heading={data.duration + ' ' + 'hour'}
            values={[data.is_free ? 'Free' : data.price + ' ' + '$']}
            marginBottom={4}
          />
          {data.use_trial ? (
            <PreviewInfo
              category="Trial lessons"
              heading={data.trial_duration + ' ' + 'hour'}
              values={[
                getTrialLessonResult(
                  data.use_trial,
                  data.is_trial_free,
                  data.trial_price + ' ' + '$'
                ),
              ]}
              marginBottom={0}
            />
          ) : null}
        </Box>
      ) : (
        <Typography variant="body1">
          No data. Click on Edit button to add information.
        </Typography>
      )}
    </>
  )
}

export default PreviewTeacherCostPersonalLessons
