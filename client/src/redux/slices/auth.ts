import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { UserRole } from '@/types/role'
import { ITeacherProgressAccount } from '@/models/teacher/teacher-progress-account'
import { IVideo } from '@/models/video'
import { defaultAuthState } from '../default-state/auth'

export interface IAuthUserInfo {
  _id: string
  name: string
  surname: string
  email: string
  phone?: string | null
  about?: string | null
  role: UserRole | null
  avatar?: string | null
  video?: IVideo | null
  progress_account?: ITeacherProgressAccount
}

export interface IAuthState {
  user: ITeacherProgressAccount
  isAuth: boolean
}

export const authSlice = createSlice({
  name: 'user',
  initialState: {
    user: defaultAuthState,
    isAuth: false,
  },
  reducers: {
    setAuthState(state, action: PayloadAction<IAuthUserInfo>) {
      state.user = action.payload
      state.isAuth = true
    },
    removeAuthState(state) {
      state.user = defaultAuthState
      state.isAuth = false
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.user,
      }
    },
  },
})

export const { setAuthState, removeAuthState } = authSlice.actions

// export const selectAuthState = (state: AppState): IAuthState => {
//   return state.user
// }

export default authSlice.reducer
