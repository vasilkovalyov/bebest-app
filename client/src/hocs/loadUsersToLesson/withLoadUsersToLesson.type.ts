import { IUserForLesson } from '@/components/UserListLesson/UserListLesson'
import { UserRole } from '@/types/role'

export interface IWithLoadUserToLesson {
  userRole: UserRole
  modal: boolean
  loading: boolean
  loadingUsers: boolean
  options: IUserForLesson[]
  users: IUserForLesson[]
  notification: boolean
  onStart: () => void
  onHandleAddUser: (user: IUserForLesson) => void
  deleteUserFromLesson: (userId: string) => void
}
