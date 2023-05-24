interface IInfo {
  title: string
  name?: string | null
}

export interface IAccountInfoProps {
  items: IInfo[]
  directionItems?: 'row' | 'column'
  gap?: number
  marginBottom?: number
}
