// libs
import { useState } from 'react'

//redux
import { useAppSelector } from '@/redux/hooks'

// material ui components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'

//custom components
import PaymentCard from '@/components/PaymentCard'
import Icon from '@/components/Generic/Icon'
import { IconEnum } from '@/components/Generic/Icon/Icon.type'

function BankData() {
  const user = useAppSelector((store) => store.user.user)
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const cardNumberLength = 16
  const [cardNumber, setCardNumber] = useState<string>('')

  function onHandleOpenModal() {
    setModalOpen(true)
  }

  function handleCloseModal() {
    setModalOpen(false)
  }

  function onHandleAddCard() {
    console.log(cardNumber)
  }

  return (
    <Box paddingY={4}>
      <Typography variant="h5">Payment and card</Typography>
      <Typography variant="body1">
        Here you will find information about your accounts. The card number will
        provide an opportunity to receive funds for the lessons
      </Typography>
      <Box display="flex" alignItems="center">
        <Button
          type="submit"
          variant="contained"
          size="small"
          onClick={onHandleOpenModal}
        >
          <Icon
            icon={IconEnum.PLUS}
            size={16}
            className="admin-account-tabs__item-icon"
          />
          Add payment card
        </Button>
      </Box>
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box className="modal-box">
          <Button
            className="modal-box__button-close"
            onClick={handleCloseModal}
          >
            <Icon
              icon={IconEnum.CROSS_OUTLINE}
              size={20}
              color="#000000"
              className="modal-box__button-close-icon"
            />
          </Button>
          <Box className="modal-box__inner">
            <Box textAlign="center" marginBottom={2}></Box>
            <Box maxWidth={400}>
              <Typography variant="h4" className="ta-c">
                Add bank card
              </Typography>
              <Box marginBottom={2}>
                <PaymentCard
                  fullname={`${user.name} ${user.surname}`}
                  onChange={(value) => setCardNumber(value)}
                />
              </Box>
              <Typography variant="body1" className="ta-c">
                The card number is required so that you can receive payment for
                the classes you have completed
              </Typography>
              <Box textAlign="center">
                <Button
                  size="small"
                  variant="outlined"
                  onClick={onHandleAddCard}
                  disabled={cardNumber.length !== cardNumberLength}
                >
                  Add card
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}

export default BankData
