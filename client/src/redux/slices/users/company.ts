import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { defaultCompanyState } from '../../default-state/company'
import { ICompany } from '@/types/company/company'

export interface ICompanyUserState {
  user: ICompany
}

export const companySlice = createSlice({
  name: 'company',
  initialState: {
    user: defaultCompanyState,
  },
  reducers: {
    setCompanyState(state, action: PayloadAction<ICompany>) {
      state.user = action.payload
    },
    removeCompanyState(state) {
      state.user = defaultCompanyState
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.company,
      }
    },
  },
})

export const { setCompanyState, removeCompanyState } = companySlice.actions

export default companySlice.reducer
