import { IPaymentCardState } from '../slices/payment-card'

export const defaultPaymentCardState: IPaymentCardState = {
  card_number: '',
  username: '',
  loading: true,
  error: null,
}
