import profilePages from '@/constants/profile-pages'

export interface ICabinetPageMenu {
  id: number
  path: string
  title: string
  icon?: string
  role: string[]
}
const cabinetPages: ICabinetPageMenu[] = [
  {
    id: 1,
    title: 'Account',
    icon: 'user',
    path: profilePages.cabinet,
    role: [],
  },
  {
    id: 2,
    title: 'My lessons',
    icon: 'lessons',
    path: profilePages.lessons,
    role: ['student', 'teacher'],
  },
  {
    id: 3,
    title: 'My teachers',
    icon: 'heart-empty',
    path: profilePages.teachers,
    role: ['student'],
  },
  {
    id: 4,
    title: 'Courses',
    icon: 'lessons',
    path: profilePages.courses,
    role: ['company'],
  },
  {
    id: 5,
    title: 'Payment',
    icon: 'payment-info',
    path: profilePages.payment,
    role: [],
  },
  {
    id: 6,
    title: 'Services',
    icon: 'services',
    path: profilePages.services,
    role: ['company'],
  },
  {
    id: 7,
    title: 'Statistics',
    icon: 'statistics',
    path: profilePages.statistics,
    role: [],
  },
  {
    id: 8,
    title: 'Company team',
    icon: 'company',
    path: profilePages.companyTeam,
    role: ['company'],
  },
  {
    id: 9,
    title: 'Chats',
    icon: 'chat',
    path: profilePages.chats,
    role: [],
  },
]

export default cabinetPages
