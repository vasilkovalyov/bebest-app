import { ICompanyAccountFormFields } from '@/types/company/company'

export const fields: Readonly<
  {
    readonly name: keyof ICompanyAccountFormFields
    readonly label: string
    readonly disabled?: boolean
    readonly textarea?: boolean
  }[]
> = [
  {
    name: 'company_name',
    label: 'Company name',
  },
  {
    name: 'admin_name',
    label: 'Admin name',
  },
  {
    name: 'admin_surname',
    label: 'Admin surname',
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
