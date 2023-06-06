import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppState } from '../store'
import { HYDRATE } from 'next-redux-wrapper'
import { UserRole } from '@/types/role'

export interface ITeacherProgressAccount {
  about?: {
    value: number
    title: string
  }
  avatar?: {
    value: number
    title: string
  }
  phone?: {
    value: number
    title: string
  }
  payment_card?: {
    value: number
    title: string
  }
  certificate?: {
    value: number
    title: string
  }
  experience?: {
    value: number
    title: string
  }
  trial_lessons?: {
    value: number
    title: string
  }
  personal_lessons?: {
    value: number
    title: string
  }
  fullname: {
    value: number
    title: string
  }
  subjects?: {
    value: number
    title: string
  }
  video?: {
    value: number
    title: string
  }
  profile_progress: number
  total_checked_count: number
}

export interface IVideo {
  width: number
  height: number
  format: string
  resource_type: string
  bytes: number
  url: string
  secure_url: string
  playback_url: string
}

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

const defaultProgressAccountState: ITeacherProgressAccount = {
  fullname: {
    value: 0,
    title: '',
  },
  about: {
    value: 0,
    title: '',
  },
  payment_card: {
    value: 0,
    title: '',
  },
  certificate: {
    value: 0,
    title: '',
  },
  experience: {
    value: 0,
    title: '',
  },
  personal_lessons: {
    value: 0,
    title: '',
  },
  phone: {
    value: 0,
    title: '',
  },
  avatar: {
    value: 0,
    title: '',
  },
  subjects: {
    value: 0,
    title: '',
  },
  trial_lessons: {
    value: 0,
    title: '',
  },
  video: {
    value: 0,
    title: '',
  },
  profile_progress: 0,
  total_checked_count: 0,
}

const defaultAuthState: IAuthUserInfo = {
  _id: '',
  name: '',
  surname: '',
  email: '',
  phone: null,
  about: null,
  role: null,
  avatar: null,
  video: null,
  progress_account: defaultProgressAccountState,
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
