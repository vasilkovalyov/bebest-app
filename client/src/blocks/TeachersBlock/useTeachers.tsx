// libs
import { useState } from 'react'

// types
import { ITeacherPreviewInfo } from '@/types/teacher/teacher'

// services
import teacherService from '@/services/teacher'

type UseTeachersReturnType = {
  teachers: ITeacherPreviewInfo[]
  loading: boolean
  loadTeachers: () => void
}

export function useTeachers(): UseTeachersReturnType {
  const [teachers, setTeachers] = useState<ITeacherPreviewInfo[]>([])
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
