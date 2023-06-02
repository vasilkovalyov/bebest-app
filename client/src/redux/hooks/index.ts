import { TypedUseSelectorHook, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '../store'
import { useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { authSlice } from '../slices/auth'
import { subjectsSlice } from '../slices/subjects'
import { teacherPersonalInfoSlice } from '../slices/teacher-personal-info'

const actions = {
  ...authSlice.actions,
  ...subjectsSlice.actions,
  ...teacherPersonalInfoSlice.actions,
}

// export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(actions, dispatch)
}
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
