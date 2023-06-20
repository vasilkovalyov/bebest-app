import { AxiosResponse } from 'axios'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { PRIVATE_REQUESTS } from '@/constants/api-requests'
import $api from '@/utils/ajax'
import { UserRole } from '@/types/role'
import { defaultPaymentCardState } from '../default-state/payment-card'
import { IPaymentCard } from '@/types/payment-card'

export interface IPaymentCardState extends IPaymentCard {
  loading: boolean
  error: string | null
}

export const fetchPaymentCard = createAsyncThunk<
  AxiosResponse<IPaymentCard | null>,
  UserRole
>('user/fetchPaymentCard', async (userRole) => {
  try {
    const response = await $api().get(
      `/${PRIVATE_REQUESTS.PAYMENT_CARD}/${userRole}`
    )
    return response
  } catch (error) {
    throw new Error('Failed to fetch payment card.')
  }
})

export const paymentCardSlice = createSlice({
  name: 'paymentCard',
  initialState: defaultPaymentCardState,
  reducers: {
    setPaymentCard(state: IPaymentCard, action: PayloadAction<IPaymentCard>) {
      state = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaymentCard.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPaymentCard.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.card_number = action.payload.data.card_number
          state.username = action.payload.data.username
        } else {
          state.card_number = defaultPaymentCardState.card_number
          state.username = defaultPaymentCardState.username
        }
        state.loading = false
        state.error = null
      })
      .addCase(fetchPaymentCard.rejected, (state, action) => {
        state.loading = false
      })
  },
})

export const { setPaymentCard } = paymentCardSlice.actions

export default paymentCardSlice.reducer
