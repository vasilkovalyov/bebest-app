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
import TeacherWorkExperience from '@/components/Forms/TeacherWorkExperience'
import PreviewInfo from '../../components/PreviewInfo'

//other utils

function TeacherWorkExperienceBlock() {
  const [isEdit, seIsEdit] = useState<boolean>(false)

  const teacherPersonalInfo = useAppSelector(
    (store) => store.teacherPersonalInfo
  )

  function onHandleClose() {
    seIsEdit(!isEdit)
  }

  return (
    <ContainerWithShadow paddingSize="sm">
      <Typography
        marginBottom={3}
        variant="h5"
        className="section-admin__heading"
      >
        Work experience
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
                {teacherPersonalInfo.work_experience.length ? (
                  <Box>
                    {teacherPersonalInfo.work_experience.map((item) => (
                      <Box key={item._id}>
                        <PreviewInfo
                          heading="Company"
                          values={[item.company_name]}
                        />
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
                              {item.startDate}
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
            ) : (
              <TeacherWorkExperience onHandleClose={onHandleClose} />
            )}
          </Box>
        )}
      </Box>
    </ContainerWithShadow>
  )
}

export default TeacherWorkExperienceBlock
