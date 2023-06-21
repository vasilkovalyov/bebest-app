import { useActions } from '@/redux/hooks'
import teacherService from '@/services/teacher'
import studentService from '@/services/student'
import companyService from '@/services/company'
import { UserRole } from '@/types/role'

export function useLoadUserInfo() {
  const { setAuthState, setStudentState, setTeacherState, setCompanyState } =
    useActions()

  async function loadUserInfo(userRole: UserRole) {
    if (userRole === 'student') {
      const studentInfoResponse = await studentService.getUserInfo()
      setAuthState({
        name: studentInfoResponse.data.name,
        surname: studentInfoResponse.data.surname,
        avatar: studentInfoResponse.data.avatar,
      })
      setStudentState(studentInfoResponse.data)
    }
    if (userRole === 'teacher') {
      const teachernfoResponse = await teacherService.getUserInfo()
      setAuthState({
        name: teachernfoResponse.data.name,
        surname: teachernfoResponse.data.surname,
        avatar: teachernfoResponse.data.avatar,
      })
      setTeacherState(teachernfoResponse.data)
    }
    if (userRole === 'company') {
      const companyInfoResponse = await companyService.getUserInfo()
      setAuthState({
        name: companyInfoResponse.data.admin_name,
        surname: companyInfoResponse.data.admin_surname,
        avatar: companyInfoResponse.data.avatar,
      })
      setCompanyState(companyInfoResponse.data)
    }
  }

  return {
    loadUserInfo,
  }
}
