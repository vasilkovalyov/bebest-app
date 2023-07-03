export const PUBLIC_REQUESTS = {
  LOGIN: 'login',
  STUDENT_REGISTRATION: 'student/registration',
  TEACHER_REGISTRATION: 'teacher/registration',
  COMPANY_REGISTRATION: 'company/registration',
  IS_AUTH: 'is-auth',
  GET_SUBJECTS: '/get-subjects',
  GET_TEACHERS: 'get-teachers',
  GET_TEACHER_PROFILE: 'get-teacher-profile',
}

export const STUDENT_REQUESTS = {
  UPDATE_ACCOUNT_INFO: '/student/update-account-info',
  GET_ACCOUNT_INFO: '/student/get-account-info',
  DELETE_ACCOUNT: '/student/delete-account',
  CHANGE_PASSWORD: '/student/change-password',
  CREATE_SUBJECT: '/student/create-subject',
  DELETE_SUBJECT: '/student/delete-subject',
  GET_SUBJECTS: '/student/get-subjects',
  GET_STUDENTS: '/get-students',
}

export const TEACHER_REQUESTS = {
  UPDATE_ACCOUNT_INFO: '/teacher/update-account-info',
  GET_ACCOUNT_INFO: '/teacher/get-account-info',
  DELETE_ACCOUNT: '/teacher/delete-account',
  CHANGE_PASSWORD: '/teacher/change-password',
  CREATE_MAIN_FIELD_ACTIVITY: '/teacher/create-main-field-activity',
  DELETE_MAIN_FIELD_ACTIVITY: '/teacher/delete-main-field-activity',
  GET_PERSONAL_INFO: '/teacher/get-personal-info',
  UPDATE_PERSONAL_LESSON: '/teacher/update-personal-lessons',
  GET_PAYMENT_CARD: '/teacher/get-payment-card',
  CREATE_WORK_EXPERIENCE: '/teacher/create-work-experience',
  DELETE_WORK_EXPERIENCE: '/teacher/delete-work-experience',
  CREATE_CERTIFICATE: '/teacher/create-certificate',
  DELETE_CERTIFICATE: '/teacher/delete-certificate',
  CREATE_LESSON: '/teacher/create-lesson',
  UPDATE_LESSON: '/teacher/update-lesson',
  DELETE_LESSON: '/teacher/delete-lesson',
  GET_LESSON: '/teacher/get-lesson',
  GET_LESSONS: '/teacher/get-lessons',
  CREATE_LESSON_MODULE: '/teacher/create-lesson-module',
  UPDATE_LESSON_MODULE: '/teacher/update-lesson-module',
  DELETE_LESSON_MODULE: '/teacher/delete-lesson-module',
  GET_LESSON_MODULE: '/teacher/get-lesson-module',
  GET_MODULES_LESSON: '/teacher/get-modules-lesson',
  ADD_STUDENT_TO_LESSON: '/teacher/add-student-to-lesson',
  DELETE_STUDENT_FROM_LESSON: '/teacher/delete-student-from-lesson',
  GET_STUDENTS_FROM_LESSON: '/teacher/get-students-from-lesson',
}

export const COMPANY_REQUESTS = {
  UPDATE_ACCOUNT_INFO: '/company/update-account-info',
  GET_ACCOUNT_INFO: '/company/get-account-info',
  DELETE_ACCOUNT: '/company/delete-account',
  CHANGE_PASSWORD: '/company/change-password',
}

export const UPLOAD_REQUESTS = {
  UPLOAD_AVATAR: 'upload-avatar',
  UPLOAD_VIDEO: 'upload-video',
}

export const PRIVATE_REQUESTS = {
  CREATE_PAYMENT_CARD: 'create-payment-card',
  DELETE_PAYMENT_CARD: 'delete-payment-card',
}
