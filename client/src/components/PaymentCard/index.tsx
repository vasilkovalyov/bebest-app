// hooks
import { usePaymentCard } from './usePaymentCard'

// material ui components
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'

//relate utils
import { IPaymentCardProps } from './PaymentCard.type'

function PaymentCard({
  fullname,
  value = '',
  editMode = true,
  onChange,
}: IPaymentCardProps) {
  const {
    cardLogo,
    cardNumber,
    formatCardNumber,
    onChangeCardNumber,
    getDisplayNumbers,
  } = usePaymentCard(value)

  function handleChange(value: string) {
    const number = value.replace(/ /gi, '')
    onChangeCardNumber(number)
    onChange && onChange(number)
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
        {editMode ? (
          <TextField
            id="payment-card"
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
        ) : null}
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
