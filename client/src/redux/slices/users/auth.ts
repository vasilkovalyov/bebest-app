import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { IUser } from '@/types/user'
import { defaultAuthState } from '@/redux/default-state/auth'

export interface IAuthState {
  user: IUser
  isAuth: boolean
}

export const authSlice = createSlice({
  name: 'user',
  initialState: {
    user: defaultAuthState,
    isAuth: false,
  },
  reducers: {
    setAuthState(state: IAuthState, action: PayloadAction<IUser>) {
      state.user = action.payload
      state.isAuth = true
    },
    removeAuthState(state: IAuthState) {
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

export default authSlice.reducer
