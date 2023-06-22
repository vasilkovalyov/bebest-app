//libs
import { useEffect } from 'react'

//redux
import { useAppSelector } from '@/redux/hooks'
import { useDispatch } from 'react-redux'
import { fetchTeacherPersonalInfo } from '@/redux/slices/teacher-personal-info'
import { fetchPaymentCard } from '@/redux/slices/payment-card'
import { fetchStudentSubjects } from '@/redux/slices/student-subjects'

// material ui components
import Box from '@mui/material/Box'

// layouts
import CabinetLayout from '@/layouts/CabinetLayout'

// blocks
import AccountBlock from '@/blocks/AccountBlock'
import StudentSubjectsBlock from '@/blocks/StudentSubjectsBlock'
import TeacherWorkExperienceBlock from '@/blocks/TeacherWorkExperienceBlock'
import TeacherСertificatesBlock from '@/blocks/TeacherСertificatesBlock'
import TeacherCostPersonalLessonsBlock from '@/blocks/TeacherCostPersonalLessonsBlock'
import UserFieldsActivityBlock from '@/blocks/UserFieldsActivityBlock'

function PageCabinet() {
  const userStore = useAppSelector((store) => store.user.user)
  const dispatch = useDispatch<any>()

  useEffect(() => {
    if (userStore.role === 'student') {
      dispatch(fetchStudentSubjects())
    }

    if (userStore.role === 'teacher') {
      dispatch(fetchTeacherPersonalInfo())
      dispatch(fetchPaymentCard(userStore.role))
    }
  }, [userStore])

  return (
    <CabinetLayout>
      <Box marginBottom={4}>
        <AccountBlock />
      </Box>
      {userStore.role === 'student' ? (
        <Box marginBottom={4}>
          <StudentSubjectsBlock />
        </Box>
      ) : null}
      {userStore.role === 'teacher' ? (
        <Box marginBottom={4}>
          <UserFieldsActivityBlock />
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
