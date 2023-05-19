import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AppState } from '../store'
import { HYDRATE } from 'next-redux-wrapper'
import { UserRole } from '@/types/role'

export interface IAuthUserInfo {
  _id: string
  name: string
  surname: string
  email: string
  phone?: string | null
  about?: string | null
  role: UserRole | null
}

export interface IAuthState {
  user: IAuthUserInfo
  isAuth: boolean
}

const defaultAuthState: IAuthUserInfo = {
  _id: '',
  name: '',
  surname: '',
  email: '',
  phone: null,
  about: null,
  role: null,
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

export const selectAuthState = (state: AppState): IAuthState => {
  return state.user
}

export default authSlice.reducer
