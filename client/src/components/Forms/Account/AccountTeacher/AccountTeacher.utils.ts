import { TeacherAccountUpdateType } from '@/types/teacher/teacher'

export const fields: Readonly<
  {
    name: keyof TeacherAccountUpdateType
    label: string
    disabled?: boolean
    textarea?: boolean
  }[]
> = [
  {
    name: 'name',
    label: 'Name',
  },
  {
    name: 'surname',
    label: 'Surname',
  },
  {
    name: 'email',
    label: 'Email',
    disabled: true,
  },
  {
    name: 'phone',
    label: 'Phone',
  },
  {
    name: 'about',
    label: 'About',
    textarea: true,
  },
]
