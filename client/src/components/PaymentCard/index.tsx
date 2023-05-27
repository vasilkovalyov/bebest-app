// libs
import { useState } from 'react'

// material ui components
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'

//relate utils
import { IPaymentCardProps } from './PaymentCard.type'

const visaImage =
  'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/visa.png'
const masterCardImage =
  'https://res.cloudinary.com/jasuaje/image/upload/v1661353947/mastercard_v7vv3g.png'

function PaymentCard({ fullname, onChange }: IPaymentCardProps) {
  const [cardNumber, setCardNumber] = useState<string>('')
  const [cardLogo, setCardLogo] = useState<string>('')

  const getCardType = (number: string) => {
    let re = new RegExp('^4')
    if (number.match(re) != null) return 'visa'
    re = new RegExp('^5[1-5]')
    if (number.match(re) != null) return 'mastercard'
    return 'visa'
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

  function handleChange(value: string) {
    value = value.replace(/ /gi, '')
    const cardType = getCardType(value)
    if (cardType === 'visa') setCardLogo(visaImage)
    if (cardType === 'mastercard') setCardLogo(masterCardImage)

    setCardNumber(value)
    onChange(value)
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

  return (
    <Box className="payment-card">
      <Box className="payment-card__bg">
        <img
          src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/14.jpeg"
          alt="bg"
        />
      </Box>
      <Box className="payment-card__body">
        <Box className="payment-card__top" marginBottom={4}>
          <Box className="payment-card__top-image-left">
            <img src="https://res.cloudinary.com/jasuaje/image/upload/v1661352906/chip_gviivf.png" />
          </Box>
          <Box className="payment-card__top-image-right">
            {cardLogo ? <img src={cardLogo} alt="card logo" /> : null}
          </Box>
        </Box>
        <Box className="payment-card__numbers">
          <Stack direction="row" justifyContent="space-between">
            {getDisplayNumbers().map((item, index) => (
              <Box key={index} className="payment-card__number-item">
                <Box
                  className={
                    'payment-card__number' +
                    ' ' +
                    (item === '#' ? 'shown' : 'hidden')
                  }
                >
                  #
                </Box>
                <div
                  className={
                    'payment-card__number' +
                    ' ' +
                    (item === '#' ? 'hidden' : 'shown')
                  }
                >
                  {item === '#' ? '' : item}
                </div>
              </Box>
            ))}
          </Stack>
        </Box>
        <TextField
          className="number-input"
          size="small"
          variant="standard"
          value={formatCardNumber(cardNumber)}
          onChange={(event) => handleChange(event.currentTarget.value)}
          inputProps={{
            pattern: '[0-9]*',
            inputMode: 'numeric',
            maxLength: 19,
          }}
        />
        <Box className="payment-card__bottom">
          <Typography
            variant="body1"
            className="payment-card__holder"
            marginBottom={0.5}
          >
            Card Holder
          </Typography>
          <Typography
            variant="body2"
            className="payment-card__fullname"
            marginBottom={0}
          >
            {fullname}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default PaymentCard
