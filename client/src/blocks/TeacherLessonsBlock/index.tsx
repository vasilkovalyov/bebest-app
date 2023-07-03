//libs
import Link from 'next/link'
import { useState } from 'react'

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
import LessonTypeBox from '@/components/LessonTypeBox'
import TeacherLessons from '@/components/TeacherLessons'

//other utils
import colors from '@/constants/colors'
import { LessonType } from '@/types/lessons'

function TeacherLessonsBlock() {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [selectedLesson, setSelectedLesson] = useState<LessonType>('multiple')

  function handleCloseModal() {
    setModalOpen(false)
  }

  return (
    <>
      <ContainerWithShadow paddingSize="sm">
        <Box marginBottom={4}>
          <Button
            variant="contained"
            size="small"
            onClick={() => setModalOpen(true)}
          >
            Create lesson
          </Button>
        </Box>
        <TeacherLessons />
      </ContainerWithShadow>
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box className="modal-box modal-box-lesson-type">
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
            <Box maxWidth={600} width="100%">
              <Box textAlign="center" marginBottom={2}>
                <Icon
                  icon={IconEnum.LESSONS}
                  size={40}
                  color={colors.dark_blue}
                />
              </Box>
              <Typography marginBottom={3} variant="h4" textAlign="center">
                Choose type lesson
              </Typography>
              <Stack direction="row" gap={2} marginBottom={3}>
                <LessonTypeBox
                  title="Multiple"
                  text="A lesson designed for several modules"
                  type="multiple"
                  onClick={(type) => setSelectedLesson(type)}
                  className={selectedLesson === 'multiple' ? 'active' : null}
                />
                <LessonTypeBox
                  title="Single"
                  text="A one-time meeting for a specified period of time"
                  type="single"
                  onClick={(type) => setSelectedLesson(type)}
                  className={selectedLesson === 'single' ? 'active' : null}
                />
              </Stack>
              <Box textAlign="center">
                <Link href={`/cabinet/create-lesson/${selectedLesson}`}>
                  Next step
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default TeacherLessonsBlock
