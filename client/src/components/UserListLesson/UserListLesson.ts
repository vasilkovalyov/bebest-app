import { UserRole } from '@/types/role'

export interface IUserForLesson {
  _id: string
  fullname: string
  avatar?: string
}

export interface IUserListLessonProps {
  users: IUserForLesson[]
  className?: string
  onHandleDelete: (props: IUserForLesson) => void
}
