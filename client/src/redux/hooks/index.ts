import { TypedUseSelectorHook, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '../store'
import { useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { authSlice } from '../slices/auth'

const actions = {
  ...authSlice.actions,
}

// export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(actions, dispatch)
}
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
