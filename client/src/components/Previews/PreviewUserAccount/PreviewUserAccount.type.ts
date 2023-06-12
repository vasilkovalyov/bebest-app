export interface IPreviewUserAccountItem {
  title: string
  name?: string | null
}

export interface IPreviewUserAccountProps {
  items: IPreviewUserAccountItem[]
  directionItems?: 'row' | 'column'
  gap?: number
  marginBottom?: number
}
