export interface IHeaderNavigationProps {
  menu: IHeaderNavigationMenuItem[]
}

export interface IHeaderNavigationMenuItem {
  id: number
  path: string
  title: string
  isCabinetShow: boolean
}
