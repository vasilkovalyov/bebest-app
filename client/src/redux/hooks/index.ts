import { TypedUseSelectorHook, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { authSlice } from '../slices/users/auth'
import { studentSlice } from '../slices/users/student'
import { teacherSlice } from '../slices/users/teacher'
import { companySlice } from '../slices/users/company'
import { subjectsSlice } from '../slices/subjects'
import { teacherPersonalInfoSlice } from '../slices/teacher-personal-info'
import { paymentCardSlice } from '../slices/payment-card'
import { studentSubjectsSlice } from '../slices/student-subjects'

const actions = {
  ...authSlice.actions,
  ...studentSlice.actions,
  ...teacherSlice.actions,
  ...companySlice.actions,
  ...subjectsSlice.actions,
  ...teacherPersonalInfoSlice.actions,
  ...paymentCardSlice.actions,
  ...studentSubjectsSlice.actions,
}

export const useActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(actions, dispatch)
}
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
