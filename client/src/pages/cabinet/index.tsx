//libs
import { useEffect } from 'react'

//redux
import { useAppSelector } from '@/redux/hooks'
import { useDispatch } from 'react-redux'
import { fetchTeacherPersonalInfo } from '@/redux/slices/teacher-personal-info'
import { fetchPaymentCard } from '@/redux/slices/payment-card'

// material ui components
import Box from '@mui/material/Box'

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

  useEffect(() => {
    if (userStore.role === 'teacher') {
      dispatch(fetchTeacherPersonalInfo())
      dispatch(fetchPaymentCard(userStore.role))
    }
  }, [dispatch])

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
    </CabinetLayout>
  )
}

export default PageCabinet
