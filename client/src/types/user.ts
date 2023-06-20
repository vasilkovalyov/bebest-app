import { UserRole } from './role'

export interface IUser {
  _id: string | null
  role: UserRole | null
  name: string
  surname: string
  avatar?: string | null
}
