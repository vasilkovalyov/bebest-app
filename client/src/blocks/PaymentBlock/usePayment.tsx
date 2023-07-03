// redux
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchPaymentCard } from '@/redux/slices/payment-card'

// services
import paymentCardService from '@/services/payment-card'
import { UserRole } from '@/types/role'

const cardNumberLength = 16

type UsePaymentReturnType = {
  cardNumber: string
  cardNumberLength: number
  createCard: (role: UserRole) => void
  deleteCard: (role: UserRole) => void
  setCardNumber: (value: string) => void
}

export function usePayment(username: string): UsePaymentReturnType {
  const dispatch = useDispatch<any>()
  const [cardNumber, setCardNumber] = useState<string>('')

  async function createCard(role: UserRole) {
    if (!cardNumber) return
    await paymentCardService.addPaymentCard(
      {
        card_number: cardNumber,
        username: username,
      },
      role
    )
    dispatch(fetchPaymentCard(role))
  }

  async function deleteCard(role: UserRole) {
    await paymentCardService.deletePaymentCard(role)
    dispatch(fetchPaymentCard(role))
  }

  return {
    cardNumber,
    cardNumberLength,
    createCard,
    deleteCard,
    setCardNumber,
  }
}
