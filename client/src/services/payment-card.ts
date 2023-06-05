import { PRIVATE_REQUESTS } from '@/constants/api-requests'
import { IPaymentCard } from '@/redux/slices/payment-card'
import { UserRole } from '@/types/role'
import $api from '@/utils/ajax'
import { AxiosResponse } from 'axios'

class PaymentCardService {
  async addPaymentCard(
    props: IPaymentCard,
    userRole: UserRole
  ): Promise<AxiosResponse<{ message: string }>> {
    const response = await $api().post(
      `/${PRIVATE_REQUESTS.PAYMENT_CARD}/${userRole}`,
      {
        ...props,
      }
    )
    return response
  }

  async removePaymentCard(
    userRole: UserRole
  ): Promise<AxiosResponse<{ message: string }>> {
    const response = await $api().delete(
      `/${PRIVATE_REQUESTS.PAYMENT_CARD}/${userRole}`
    )
    return response
  }
}

const paymentCardService = new PaymentCardService()

export default paymentCardService
