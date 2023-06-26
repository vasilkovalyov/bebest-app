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
import Modal from '@mui/material/Modal'

//custom components
import Icon from '@/components/Generic/Icon'
import { IconEnum } from '@/types/icons'
import ContainerWithShadow from '@/components/Generic/ContainerWithShadow'
import TeacherWorkExperience from '@/components/Forms/TeacherWorkExperience'
import PreviewWorkExperience from '@/components/Previews/PreviewWorkExperience'
import LessonModuleForm from '@/components/Forms/LessonModule'

//relate utils
import { ITeacherTrainingPlanBlockProps } from './TeacherTrainingPlanBlock.type'

//other utils
import colors from '@/constants/colors'
import { ITeacherLessonModuleEditableProps } from '@/types/teacher/teacher-lesson-module'

function TeacherTrainingPlanDefaultContent() {
  return (
    <Stack direction="row" justifyContent="center" gap={1}>
      <Icon
        icon={IconEnum.INFO_CIRCULAR_OUTLINE}
        size={20}
        color={colors.blue}
      />
      <Typography marginBottom={3} variant="body1">
        Create a workshop to start creating modules for it!
      </Typography>
    </Stack>
  )
}

function TeacherTrainingPlanBlock({
  editType,
}: ITeacherTrainingPlanBlockProps) {
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  function handleCloseModal() {
    setModalOpen(false)
  }

  function handleCreateLessonModule(props: ITeacherLessonModuleEditableProps) {
    console.log('props', props)
  }

  return (
    <Box marginBottom={4}>
      <ContainerWithShadow paddingSize="sm">
        <Typography marginBottom={3} variant="h5">
          Add a training plan
        </Typography>
        {editType ? (
          <Box>
            <Box textAlign="center">
              <Button
                variant="outlined"
                size="small"
                onClick={() => setModalOpen(true)}
              >
                <Icon icon={IconEnum.PLUS} color={colors.primary} size={16} />
                Add module
              </Button>
            </Box>
          </Box>
        ) : (
          <TeacherTrainingPlanDefaultContent />
        )}
      </ContainerWithShadow>
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box className="modal-box">
          <Button
            className="modal-box__button-close"
            onClick={handleCloseModal}
          >
            <Icon
              icon={IconEnum.CROSS_OUTLINE}
              size={20}
              color={colors.black}
              className="modal-box__button-close-icon"
            />
          </Button>
          <Box className="modal-box__inner">
            <Typography variant="h4">Add new module for the lesson</Typography>
            <LessonModuleForm
              mode="create"
              onSubmit={handleCreateLessonModule}
            />
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}

export default TeacherTrainingPlanBlock
