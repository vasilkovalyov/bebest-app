export interface IPaymentCardProps {
  fullname: string
  value?: string
  editMode?: boolean
  onChange?: (value: string) => void
}
