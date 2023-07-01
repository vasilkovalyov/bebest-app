// libs
import { useState } from 'react'

type CardType = 'visa' | 'mastercard'

const cardTypeImage = {
  visa: 'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/visa.png',
  masterCard:
    'https://res.cloudinary.com/jasuaje/image/upload/v1661353947/mastercard_v7vv3g.png',
}

function getCardType(number: string): CardType {
  let re = new RegExp('^4')
  if (number.match(re) != null) return 'visa'
  re = new RegExp('^5[1-5]')
  if (number.match(re) != null) return 'mastercard'
  return 'visa'
}

function getImageTypeOnValue(imageType: CardType | null): string {
  if (imageType === 'visa') return cardTypeImage.visa
  if (imageType === 'mastercard') return cardTypeImage.masterCard
  return ''
}

export function usePaymentCard(value: string | '') {
  const [cardNumber, setCardNumber] = useState<string>(value)
  const [cardLogo, setCardLogo] = useState<string>(
    getImageTypeOnValue(getCardType(value))
  )

  function setImageCardTypeByValue(cardType: CardType) {
    if (cardType === 'visa') setCardLogo(cardTypeImage.visa)
    if (cardType === 'mastercard') setCardLogo(cardTypeImage.masterCard)
  }

  function onChangeCardNumber(number: string) {
    setImageCardTypeByValue(getCardType(number))
    setCardNumber(number)
  }

  function formatCardNumber(value: string) {
    let v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    let matches = v.match(/\d{4,16}/g)
    let match = (matches && matches[0]) || ''
    let parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return value
    }
  }

  function getDisplayNumbers(): string[] {
    let displayNumber = []

    for (let i = 0; i < 16; i++) {
      let displayDigit = '#'
      if (typeof cardNumber[i] !== 'undefined') {
        displayDigit = cardNumber[i]
      }
      displayNumber.push(displayDigit)
    }
    return displayNumber
  }

  return {
    cardLogo,
    cardNumber,
    formatCardNumber,
    onChangeCardNumber,
    getDisplayNumbers,
  }
}
