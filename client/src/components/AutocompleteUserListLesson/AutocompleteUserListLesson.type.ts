import { IUserForLesson } from '../UserListLesson/UserListLesson'

export interface IAutocompleteUserListLessonProps {
  loading: boolean
  className?: string
  openDropdown: () => void
  options: IUserForLesson[]
  onHandleSelectUser: (props: IUserForLesson) => void
}

export interface IRenderOptionProps {
  _id: string
  fullname: string
  avatar?: string
}
