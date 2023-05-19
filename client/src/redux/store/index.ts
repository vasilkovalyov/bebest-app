import thunk from 'redux-thunk'

import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { authSlice } from '../slices/auth'
import { createWrapper } from 'next-redux-wrapper'

const makeStore = () =>
  configureStore({
    reducer: {
      [authSlice.name]: authSlice.reducer,
    },
    middleware: [thunk],
    devTools: true,
  })

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export const store = makeStore()
export const wrapper = createWrapper<AppStore>(makeStore)
