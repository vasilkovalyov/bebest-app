import { PRIVATE_REQUESTS } from '@/constants/api-requests'
import { IPaymentCard } from '@/types/payment-card'
import { UserRole } from '@/types/role'
import $api from '@/utils/ajax'
import { AxiosResponse } from 'axios'

class PaymentCardService {
  async addPaymentCard(
    props: IPaymentCard,
    role: UserRole
  ): Promise<AxiosResponse<{ message: string }>> {
    const response = await $api().post(
      `/${role}/${PRIVATE_REQUESTS.CREATE_PAYMENT_CARD}`,
      {
        ...props,
      }
    )
    return response
  }

  async deletePaymentCard(
    role: UserRole
  ): Promise<AxiosResponse<{ message: string }>> {
    const response = await $api().delete(
      `/${role}/${PRIVATE_REQUESTS.DELETE_PAYMENT_CARD}`
    )
    return response
  }
}

const paymentCardService = new PaymentCardService()

export default paymentCardService
