//libs
import { useState } from 'react'

//redux
import { useAppSelector } from '@/redux/hooks'

// material ui components
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Fade from '@mui/material/Fade'
import CircularProgress from '@mui/material/CircularProgress'

//custom components
import Icon from '@/components/Generic/Icon'
import { IconEnum } from '@/components/Generic/Icon/Icon.type'
import ContainerWithShadow from '@/components/Generic/ContainerWithShadow'
import TeacherCostPersonalLessons from '@/components/Forms/TeacherCostPersonalLessons'
import PreviewInfo from '@/components/PreviewInfo'

//other utils
import { getTrialLessonResult } from './TeacherCostPersonalLessonsBlock.utils'

function TeacherCostPersonalLessonsBlock() {
  const [isEdit, seIsEdit] = useState<boolean>(false)
  const teacherPersonalInfo = useAppSelector(
    (store) => store.teacherPersonalInfo
  )

  function onHandleClose() {
    seIsEdit(!isEdit)
  }

  return (
    <ContainerWithShadow paddingSize="sm">
      <Typography marginBottom={3} variant="h5">
        Cost of personal lessons
      </Typography>
      <Box marginBottom={3}>
        <Divider />
      </Box>
      <Box paddingY={4} className="box-account">
        <Stack direction="row" className="box-account__controllers">
          <Button onClick={() => seIsEdit(!isEdit)}>
            {!isEdit ? <Icon icon={IconEnum.EDIT} size={18} /> : 'Close'}
          </Button>
        </Stack>
        {teacherPersonalInfo.loading ? (
          <Box textAlign="center">
            <Fade in={true} unmountOnExit>
              <CircularProgress />
            </Fade>
          </Box>
        ) : (
          <Box>
            {!isEdit ? (
              <Box>
                {teacherPersonalInfo.personal_lessons ? (
                  <Box marginBottom={2}>
                    <Box marginBottom={2}>
                      <PreviewInfo
                        category="Private lessons"
                        heading={teacherPersonalInfo.personal_lessons.duration}
                        values={[
                          teacherPersonalInfo.personal_lessons.is_free
                            ? 'Free'
                            : teacherPersonalInfo.personal_lessons.price,
                        ]}
                        marginBottom={4}
                      />
                      {teacherPersonalInfo.personal_lessons.use_trial ? (
                        <PreviewInfo
                          category="Trial lessons"
                          heading={
                            teacherPersonalInfo.personal_lessons.trial_duration
                          }
                          values={[
                            getTrialLessonResult(
                              teacherPersonalInfo.personal_lessons.use_trial,
                              teacherPersonalInfo.personal_lessons
                                .is_trial_free,
                              teacherPersonalInfo.personal_lessons.trial_price
                            ),
                          ]}
                        />
                      ) : null}
                    </Box>
                  </Box>
                ) : (
                  <Typography variant="body1">
                    No data. Click on Edit button to add information.
                  </Typography>
                )}
              </Box>
            ) : (
              <TeacherCostPersonalLessons onHandleClose={onHandleClose} />
            )}
          </Box>
        )}
      </Box>
    </ContainerWithShadow>
  )
}

export default TeacherCostPersonalLessonsBlock
