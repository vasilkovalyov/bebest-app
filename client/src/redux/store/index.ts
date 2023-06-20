import { createWrapper } from 'next-redux-wrapper'
import { combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { authSlice } from '../slices/users/auth'
import { studentSlice } from '../slices/users/student'
import { teacherSlice } from '../slices/users/teacher'
import { companySlice } from '../slices/users/company'
import { subjectsSlice } from '../slices/subjects'
import { teacherPersonalInfoSlice } from '../slices/teacher-personal-info'
import { paymentCardSlice } from '../slices/payment-card'
import { studentSubjectsSlice } from '../slices/student-subjects'

import { serviceApi } from '../apiService'
// import { userApi } from '../services/student'
// import { authApi } from '../services/auth'

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [studentSlice.name]: studentSlice.reducer,
  [teacherSlice.name]: teacherSlice.reducer,
  [companySlice.name]: companySlice.reducer,
  [subjectsSlice.name]: subjectsSlice.reducer,
  [teacherPersonalInfoSlice.name]: teacherPersonalInfoSlice.reducer,
  [paymentCardSlice.name]: paymentCardSlice.reducer,
  [studentSubjectsSlice.name]: studentSubjectsSlice.reducer,
  // [serviceApi.reducerPath]: serviceApi.reducer,
})

const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: [thunk],
    // middleware: (getDefaultMiddleware) =>
    //   getDefaultMiddleware()
    //     .concat(serviceApi.middleware)
    //     .concat(authApi.middleware)
    //     .concat(userApi.middleware),
    devTools: true,
  })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<typeof rootReducer>
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export const store = makeStore()
export const wrapper = createWrapper<AppStore>(makeStore)
