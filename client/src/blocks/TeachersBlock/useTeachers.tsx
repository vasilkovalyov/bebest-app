// libs
import { useState } from 'react'

// types
import { TeacherProfileCardType } from '@/types/teacher/teacher'

// services
import teacherService from '@/services/teacher'

type UseTeachersReturnType = {
  teachers: TeacherProfileCardType[]
  loading: boolean
  loadTeachers: () => void
}

export function useTeachers(): UseTeachersReturnType {
  const [teachers, setTeachers] = useState<TeacherProfileCardType[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  async function loadTeachers() {
    setLoading(true)
    const response = await teacherService.getUsers()
    setTeachers(response.data)
    if (response.data.length) {
      setLoading(false)
    }
  }

  return {
    teachers,
    loading,
    loadTeachers,
  }
}
