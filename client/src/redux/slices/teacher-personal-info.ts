import { AxiosResponse } from 'axios'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { TEACHER_REQUESTS } from '@/constants/api-requests'
import $api from '@/utils/ajax'

import { defaultTeacherPersonalInfoState } from '../default-state/teacher-personal-info'
import { ITeacherPersonalInfo } from '@/types/teacher/teacher-personal-info'

export interface ITeacherPersonalInfoState extends ITeacherPersonalInfo {
  loading: boolean
  error: string | null
}

export const fetchTeacherPersonalInfo = createAsyncThunk<
  AxiosResponse<ITeacherPersonalInfo>,
  void
>('user/fetchTeacherPersonalInfo', async () => {
  try {
    const response = await $api().get(TEACHER_REQUESTS.GET_PERSONAL_INFO)
    return response
  } catch (error) {
    throw new Error('Failed to fetch user information.')
  }
})

export const teacherPersonalInfoSlice = createSlice({
  name: 'teacherPersonalInfo',
  initialState: defaultTeacherPersonalInfoState,
  reducers: {
    setDataInfo(
      state: ITeacherPersonalInfo,
      action: PayloadAction<ITeacherPersonalInfo>
    ) {
      state = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeacherPersonalInfo.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTeacherPersonalInfo.fulfilled, (state, action) => {
        state.fields_activity = action.payload.data.fields_activity
        state.personal_lessons = action.payload.data.personal_lessons
        state.work_experience = action.payload.data.work_experience
        state.certificates = action.payload.data.certificates
        state.loading = false
        state.error = null
      })
      .addCase(fetchTeacherPersonalInfo.rejected, (state, action) => {
        state.loading = false
      })
  },
})

export const { setDataInfo } = teacherPersonalInfoSlice.actions

export default teacherPersonalInfoSlice.reducer
