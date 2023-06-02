import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppState } from '../store'
import { HYDRATE } from 'next-redux-wrapper'
import { ISubject } from '@/services/subjects'

export interface ISubjectsState {
  subjects: ISubject[]
}

const defaultSubjectsState: ISubjectsState = {
  subjects: [],
}

export const subjectsSlice = createSlice({
  name: 'subjects',
  initialState: defaultSubjectsState,
  reducers: {
    setSubjects(state: ISubjectsState, action: PayloadAction<ISubject[] | []>) {
      state.subjects = action.payload
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.subjects,
      }
    },
  },
})

export const { setSubjects } = subjectsSlice.actions

export const selectSubjectsState = (state: AppState): ISubjectsState => {
  return state.subjects
}

export default subjectsSlice.reducer
