//libs
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

// material ui components
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Modal from '@mui/material/Modal'

//custom components
import Icon from '@/components/Generic/Icon'
import { IconEnum } from '@/types/icons'
import ContainerWithShadow from '@/components/Generic/ContainerWithShadow'
import LessonModuleForm from '@/components/Forms/LessonModule'

//relate utils
import { ITeacherTrainingPlanBlockProps } from './TeacherTrainingPlanBlock.type'

//other utils
import colors from '@/constants/colors'
import { ITeacherLessonModule } from '@/types/teacher/teacher-lesson-module'
import teacherLessonModuleService from '@/services/teacher-lesson-module'
import LessonModules from '@/components/LessonModules'

export function TeacherTrainingPlanDefaultContent() {
  return (
    <Box marginBottom={4}>
      <ContainerWithShadow paddingSize="sm">
        <Typography marginBottom={3} variant="h5">
          Add a training plan
        </Typography>
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
      </ContainerWithShadow>
    </Box>
  )
}

function TeacherTrainingPlanBlock({
  items = [],
}: ITeacherTrainingPlanBlockProps) {
  const { query } = useRouter()
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [lessonModules, setLessonModules] =
    useState<ITeacherLessonModule[]>(items)

  function handleCloseModal() {
    setModalOpen(false)
  }

  async function handleCreateLessonModule(props: ITeacherLessonModule) {
    const lessonId = query._id as string
    await teacherLessonModuleService.createLessonModule(lessonId, props)
    loadLessonModules()
    handleCloseModal()
  }

  async function loadLessonModules() {
    const lessonId = query._id as string
    const responseLessonModules =
      await teacherLessonModuleService.getModulesLesson(lessonId)
    setLessonModules(responseLessonModules.data)
  }

  return (
    <Box marginBottom={4}>
      <ContainerWithShadow paddingSize="sm">
        <Typography marginBottom={3} variant="h5">
          Add a training plan
        </Typography>
        <Box marginBottom={4}>
          <LessonModules items={lessonModules} />
        </Box>
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
              color={colors.black_color}
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
