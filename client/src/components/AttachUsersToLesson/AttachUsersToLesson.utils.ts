import { IUserForLesson } from '@/components/UserListLesson/UserListLesson'
import { StudentLessonShortInfoType } from '@/types/student/student'

export function convertToUserListLesson(
  students: StudentLessonShortInfoType[]
): IUserForLesson[] {
  const users: IUserForLesson[] = students
    ? students.map((item) => {
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
