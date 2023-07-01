import { IUserForLesson } from '@/components/UserListLesson/UserListLesson'
import { IStudentInfoLesson } from '@/types/student/student'

export function convertToUserListLesson(
  usersList: IStudentInfoLesson[]
): IUserForLesson[] {
  const users: IUserForLesson[] = usersList
    ? usersList.map((item) => {
        const props: IUserForLesson = {
          _id: item._id,
          fullname: item.name + ' ' + item.surname,
          avatar: item.avatar || '',
        }
        return props
      })
    : []
  return users
}
