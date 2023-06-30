import { TEACHER_REQUESTS } from '@/constants/api-requests'
import { IPaymentCard } from '@/types/payment-card'
import $api from '@/utils/ajax'
import { AxiosResponse } from 'axios'

class PaymentCardService {
  async addPaymentCard(
    props: IPaymentCard
  ): Promise<AxiosResponse<{ message: string }>> {
    const response = await $api().post(TEACHER_REQUESTS.CREATE_PAYMENT_CARD, {
      ...props,
    })
    return response
  }

  async deletePaymentCard(): Promise<AxiosResponse<{ message: string }>> {
    const response = await $api().delete(TEACHER_REQUESTS.DELETE_PAYMENT_CARD)
    return response
  }
}

const paymentCardService = new PaymentCardService()

export default paymentCardService
