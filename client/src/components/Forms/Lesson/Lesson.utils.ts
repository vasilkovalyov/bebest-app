import {
  ITeacherLessonEditableProps,
  ITeacherLessonExtended,
} from '@/types/teacher/teacher-lesson'

export const defaultInitialDate: ITeacherLessonExtended = {
  topic: '',
  description: '',
  start_date: '',
  time_start: '',
  duration_months: '',
  duration_time: '',
  max_users: '',
  price: '',
  is_free: false,
  subject: {
    _id: '',
    subject: '',
  },
  type: 'multiple',
}
