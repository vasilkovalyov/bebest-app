import { INavigationMenuItem } from '../Navigation/Navigation.type'
import pages from '@/constants/pages'

export const menu: INavigationMenuItem[] = [
  {
    id: 1,
    path: pages.cources,
    title: 'Cources',
    isAdminShow: true,
  },
  {
    id: 2,
    path: pages.lessons,
    title: 'Lessons',
    isAdminShow: true,
  },
  {
    id: 3,
    path: pages.teachers,
    title: 'Teachers',
    isAdminShow: true,
  },
  {
    id: 4,
    path: pages.companies,
    title: 'Companies',
    isAdminShow: true,
  },
  {
    id: 5,
    path: pages.articles,
    title: 'Articles',
    isAdminShow: true,
  },
]
