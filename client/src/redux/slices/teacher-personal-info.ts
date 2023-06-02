import { AxiosResponse } from 'axios'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { PRIVATE_REQUESTS } from '@/constants/api-requests'
import { ITeacherCostPersonalLesson } from '@/services/teacher-cost-personal-lessons'
import $api from '@/utils/ajax'
import { IUserFieldActivity } from '@/services/user-fields-activity'
import { ITeacherWorkExperience } from '@/services/teacher-work-experience'

export interface ITeacherPersonalInfo {
  fields_activity: IUserFieldActivity[]
  work_experience: ITeacherWorkExperience[]
  personal_lessons: ITeacherCostPersonalLesson | null
}

export interface ITeacherPersonalInfoState extends ITeacherPersonalInfo {
  loading: boolean
  error: string | null
}

const defaultAuthState: ITeacherPersonalInfoState = {
  fields_activity: [],
  personal_lessons: null,
  work_experience: [],
  loading: true,
  error: null,
}

export const fetchTeacherPersonalInfo = createAsyncThunk<
  AxiosResponse<ITeacherPersonalInfo>,
  void
>('user/fetchTeacherPersonalInfo', async () => {
  try {
    const response = await $api().get(
      `/${PRIVATE_REQUESTS.PERSONAL_INFO}/teacher`
    )
    return response
  } catch (error) {
    throw new Error('Failed to fetch user information.')
  }
})

export const teacherPersonalInfoSlice = createSlice({
  name: 'teacherPersonalInfo',
  initialState: defaultAuthState,
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
