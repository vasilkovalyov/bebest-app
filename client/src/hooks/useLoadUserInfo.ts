import { useActions } from '@/redux/hooks'
import teacherService from '@/services/teacher'
import studentService from '@/services/student'
import { UserRole } from '@/types/role'

export function useLoadUserInfo() {
  const { setAuthState } = useActions()

  async function loadUserInfo(userRole: UserRole) {
    if (userRole === 'teacher') {
      const teachernfoResponse = await teacherService.getUserInfo()
      setAuthState(teachernfoResponse.data)
    }
    if (userRole === 'student') {
      const studentInfoResponse = await studentService.getUserInfo()
      setAuthState(studentInfoResponse.data)
    }
  }

  return {
    loadUserInfo,
  }
}
