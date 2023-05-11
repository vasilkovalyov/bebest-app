export interface INavigationProps {
  menu: INavigationMenuItem[]
}

export interface INavigationMenuItem {
  id: number
  path: string
  title: string
  isAdminShow: boolean
}
