import thunk from 'redux-thunk'
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { authSlice } from '../slices/auth'
import { createWrapper } from 'next-redux-wrapper'
import { combineReducers } from 'redux'
import { serviceApi } from '../apiService'
// import { userApi } from '../services/student'
// import { authApi } from '../services/auth'

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [serviceApi.reducerPath]: serviceApi.reducer,
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
