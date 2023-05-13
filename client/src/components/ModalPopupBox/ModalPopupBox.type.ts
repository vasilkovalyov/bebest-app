export interface ModalCardProps {
  children: React.ReactNode
  className?: string
  type: 'full' | 'default'
  onHandleClose: () => void
}
