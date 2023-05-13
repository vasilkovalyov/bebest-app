interface IInfo {
  title: string
  name: string | null
  isTextarea: boolean
}

export interface IAccountInfoProps {
  // items: Record<string, IInfo>
  items: IInfo[]
}
