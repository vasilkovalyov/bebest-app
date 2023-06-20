import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { defaultTeacherState } from '../../default-state/teacher'
import { ITeacher } from '@/types/teacher/teacher'

export interface ITeacherUserState {
  user: ITeacher
}

export const teacherSlice = createSlice({
  name: 'teacher',
  initialState: {
    user: defaultTeacherState,
  },
  reducers: {
    setTeacherState(state, action: PayloadAction<ITeacher>) {
      state.user = action.payload
    },
    removeTeacherState(state) {
      state.user = defaultTeacherState
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.teacher,
      }
    },
  },
})

export const { setTeacherState, removeTeacherState } = teacherSlice.actions

export default teacherSlice.reducer
