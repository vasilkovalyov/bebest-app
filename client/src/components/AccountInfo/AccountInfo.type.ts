export interface IAccountInfo {
  title: string
  name?: string | null
}

export interface IAccountInfoProps {
  items: IAccountInfo[]
  directionItems?: 'row' | 'column'
  gap?: number
  marginBottom?: number
}
