// libs
import { useState } from 'react'

//redux
import { useAppSelector } from '@/redux/hooks'
import { useDispatch } from 'react-redux'
import { fetchPaymentCard } from '@/redux/slices/payment-card'

// material ui components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Stack from '@mui/material/Stack'

//custom components
import PaymentCard from '@/components/PaymentCard'
import Icon from '@/components/Generic/Icon'
import { IconEnum } from '@/types/icons'
import WarningIcon from '@/components/Generic/WarningIcon'

//other utils
import paymentCardService from '@/services/payment-card'
import colors from '@/constants/colors'
import { useLoadUserInfo } from '@/hooks/useLoadUserInfo'

type PaymentModalType = 'add' | 'remove'

function PaymentBlock() {
  const user = useAppSelector((store) => store.user.user)
  const paymentCardStore = useAppSelector((store) => store.paymentCard)
  const dispatch = useDispatch<any>()
  const { loadUserInfo } = useLoadUserInfo()

  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const cardNumberLength = 16
  const [cardNumber, setCardNumber] = useState<string>('')

  const [modalType, setModalType] = useState<PaymentModalType>('add')

  function onHandleOpenModal(type: PaymentModalType) {
    setModalType(type)
    setModalOpen(true)
  }

  function handleCloseModal() {
    setModalOpen(false)
  }

  async function onHandleAddCard() {
    if (!user.role) return
    setModalType('add')
    await paymentCardService.addPaymentCard({
      card_number: cardNumber,
      username: user.name + ' ' + user.surname,
    })
    dispatch(fetchPaymentCard(user.role))
    loadUserInfo('teacher')
    handleCloseModal()
  }

  async function onHandleRemoveCard() {
    if (!user.role) return
    setModalType('remove')
    await paymentCardService.deletePaymentCard()
    dispatch(fetchPaymentCard(user.role))
    loadUserInfo('teacher')
    handleCloseModal()
  }

  return (
    <Box paddingY={4}>
      <Typography variant="h5">Payment and card</Typography>
      <Typography variant="body1">
        Here you will find information about your accounts. The card number will
        provide an opportunity to receive funds for the lessons
      </Typography>

      {paymentCardStore.card_number ? (
        <Box maxWidth={400} marginBottom={2}>
          <Box marginTop={2} marginBottom={2}>
            <PaymentCard
              fullname={paymentCardStore.username}
              value={paymentCardStore.card_number}
              editMode={false}
            />
          </Box>
          <Button
            type="button"
            size="small"
            onClick={() => onHandleOpenModal('remove')}
          >
            <Box
              component="span"
              marginRight={1}
              display="inline-block"
              style={{
                verticalAlign: 'middle',
              }}
            >
              <Icon icon={IconEnum.BIN} color={colors.primary} size={16} />
            </Box>
            <Box
              component="span"
              display="inline-block"
              style={{
                verticalAlign: 'middle',
                paddingTop: 4,
              }}
            >
              Remove
            </Box>
          </Button>
        </Box>
      ) : (
        <Box display="flex" alignItems="center">
          <Button
            type="submit"
            variant="contained"
            size="small"
            onClick={() => onHandleOpenModal('add')}
          >
            <Icon
              icon={IconEnum.PLUS}
              size={16}
              className="admin-account-tabs__item-icon"
            />
            Add payment card
          </Button>
        </Box>
      )}

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
              {modalType === 'remove' ? (
                <Box textAlign="center" marginBottom={2}>
                  <WarningIcon />
                </Box>
              ) : null}
              <Typography variant="h4" className="ta-c">
                {modalType === 'add' ? 'Add bank card' : null}
                {modalType === 'remove'
                  ? 'Do you really want to remove payment card?'
                  : null}
              </Typography>
              {modalType === 'add' ? (
                <>
                  <Box marginBottom={2}>
                    <PaymentCard
                      fullname={`${user.name} ${user.surname}`}
                      onChange={(value) => setCardNumber(value)}
                    />
                  </Box>
                  <Typography variant="body1" className="ta-c">
                    The card number is required so that you can receive payment
                    for the classes you have completed
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
                </>
              ) : null}
              {modalType === 'remove' ? (
                <Stack
                  direction="row"
                  justifyContent="center"
                  marginTop={2}
                  marginBottom={2}
                  spacing={3}
                >
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleCloseModal}
                  >
                    decline
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={onHandleRemoveCard}
                  >
                    accept
                  </Button>
                </Stack>
              ) : null}
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}

export default PaymentBlock
