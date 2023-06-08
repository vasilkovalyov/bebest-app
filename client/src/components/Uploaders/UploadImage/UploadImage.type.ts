export interface IUploadImageProps {
  image?: string | null
  onChange: (value: string) => void
  width?: number
  disabled?: boolean
}
