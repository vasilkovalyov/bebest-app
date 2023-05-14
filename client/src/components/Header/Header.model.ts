import { IHeaderNavigationMenuItem } from '../HeaderNavigation/HeaderNavigation.type'
import pages from '@/constants/pages'

export const menu: IHeaderNavigationMenuItem[] = [
  {
    id: 1,
    path: pages.courses,
    title: 'Courses',
    isCabinetShow: true,
  },
  {
    id: 2,
    path: pages.lessons,
    title: 'Lessons',
    isCabinetShow: true,
  },
  {
    id: 3,
    path: pages.teachers,
    title: 'Teachers',
    isCabinetShow: true,
  },
  {
    id: 4,
    path: pages.companies,
    title: 'Companies',
    isCabinetShow: true,
  },
  {
    id: 5,
    path: pages.articles,
    title: 'Articles',
    isCabinetShow: true,
  },
]
