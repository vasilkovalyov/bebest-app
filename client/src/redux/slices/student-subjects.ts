import { AxiosResponse } from 'axios'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { STUDENT_REQUESTS } from '@/constants/api-requests'
import $api from '@/utils/ajax'
import { defaultStudentSubjects } from '../default-state/studentSubjects'
import { IStudentSubjects } from '@/types/student/student-subject'

export interface IStudentSubjectsState extends IStudentSubjects {
  loading: boolean
  error: string | null
}

export const fetchStudentSubjects = createAsyncThunk<
  AxiosResponse<IStudentSubjects | null>
>('user/fetchStudentSubjects', async () => {
  try {
    const response = await $api().get(STUDENT_REQUESTS.GET_SUBJECTS)
    return response
  } catch (error) {
    throw new Error('Failed to fetch student subjects.')
  }
})

export const studentSubjectsSlice = createSlice({
  name: 'studentSubjects',
  initialState: defaultStudentSubjects,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentSubjects.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchStudentSubjects.fulfilled, (state, action) => {
        state.subjects = action.payload.data?.subjects || []
        state.loading = false
        state.error = null
      })
      .addCase(fetchStudentSubjects.rejected, (state, action) => {
        state.loading = false
      })
  },
})

export default studentSubjectsSlice.reducer
