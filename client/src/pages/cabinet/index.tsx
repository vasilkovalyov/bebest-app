//libs
import { useEffect, useState } from 'react'

//redux
import { useAppSelector } from '@/redux/hooks'
import { useDispatch } from 'react-redux'
import { fetchTeacherPersonalInfo } from '@/redux/slices/teacher-personal-info'
import { fetchPaymentCard } from '@/redux/slices/payment-card'

// material ui components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'

//custom components
import { IconEnum } from '@/components/Generic/Icon/Icon.type'
import Icon from '@/components/Generic/Icon'
import CheckmarkIcon from '@/components/Generic/CheckmarkIcon'

// layouts
import CabinetLayout from '@/layouts/CabinetLayout'

// blocks
import AccountBlock from '@/blocks/AccountBlock'
import StudentEducationInfoBlock from '@/blocks/StudentEducationInfoBlock'
import TeacherWorkExperienceBlock from '@/blocks/TeacherWorkExperienceBlock'
import TeacherСertificatesBlock from '@/blocks/TeacherСertificatesBlock'
import TeacherCostPersonalLessonsBlock from '@/blocks/TeacherCostPersonalLessonsBlock'
import MainFieldsActivityBlock from '@/blocks/UserFieldsActivityBlock'

function PageCabinet() {
  const userStore = useAppSelector((store) => store.user.user)
  const dispatch = useDispatch<any>()
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  useEffect(() => {
    if (userStore.role === 'teacher') {
      dispatch(fetchTeacherPersonalInfo())
      dispatch(fetchPaymentCard(userStore.role))
    }
  }, [dispatch])

  useEffect(() => {
    if (userStore.progress_account?.profile_progress === 100) {
      setModalOpen(true)
    }
  }, [userStore.progress_account?.profile_progress])

  function handleCloseModal() {
    setModalOpen(false)
  }

  return (
    <CabinetLayout>
      <Box marginBottom={4}>
        <AccountBlock />
      </Box>
      {userStore.role === 'student' ? (
        <Box marginBottom={4}>
          <StudentEducationInfoBlock />
        </Box>
      ) : null}
      {userStore.role === 'teacher' || userStore.role === 'company' ? (
        <Box marginBottom={4}>
          <MainFieldsActivityBlock />
        </Box>
      ) : null}
      {userStore.role === 'teacher' ? (
        <>
          <Box marginBottom={4}>
            <TeacherCostPersonalLessonsBlock />
          </Box>
          <Box marginBottom={4}>
            <TeacherСertificatesBlock />
          </Box>
          <Box marginBottom={4}>
            <TeacherWorkExperienceBlock />
          </Box>
        </>
      ) : null}
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box className="modal-box" maxWidth={400}>
          <Button
            className="modal-box__button-close"
            onClick={handleCloseModal}
          >
            <Icon
              icon={IconEnum.CROSS_OUTLINE}
              size={20}
              color="#000000"
              className="modal-box__button-close-icon"
            />
          </Button>
          <Box className="modal-box__inner">
            <Box textAlign="center" marginBottom={2}>
              <CheckmarkIcon />
            </Box>
            <Typography variant="h4" className="ta-c" marginBottom={2}>
              Congratulations you completed your account. <br /> Now all users
              can see your profile
            </Typography>
            <Box textAlign="center" maxWidth={100} marginX="auto">
              <Button
                variant="contained"
                size="small"
                onClick={handleCloseModal}
                fullWidth
              >
                Ok
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </CabinetLayout>
  )
}

export default PageCabinet
