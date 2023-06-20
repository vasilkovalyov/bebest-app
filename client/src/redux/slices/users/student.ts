import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { IStudent } from '@/types/student/student'
import { defaultStudentState } from '../../default-state/student'

export interface IStudentUserState {
  user: IStudent
}

export const studentSlice = createSlice({
  name: 'student',
  initialState: {
    user: defaultStudentState,
  },
  reducers: {
    setStudentState(state, action: PayloadAction<IStudent>) {
      state.user = action.payload
    },
    removeStudentState(state) {
      state.user = defaultStudentState
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.student,
      }
    },
  },
})

export const { setStudentState, removeStudentState } = studentSlice.actions

export default studentSlice.reducer
