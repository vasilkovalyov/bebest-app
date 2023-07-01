// libs
import React, { ComponentType, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { IWithLoadUserToLesson } from './withLoadUsersToLesson.type'

import studentService from '@/services/student'
import teacherLessonService from '@/services/teacher-lesson'

import { IUserForLesson } from '@/components/UserListLesson/UserListLesson'
import { convertToUserListLesson } from './withLoadUsersToLesson.utils'

const defaultUser: IUserForLesson = {
  _id: '',
  fullname: '',
  avatar: '',
}

export function withLoadStudentsToLesson<T extends IWithLoadUserToLesson>(
  Component: ComponentType<T>
) {
  const displayName = Component.displayName || Component.name || 'Component'

  const ComponentWithLoadUsers = (
    props: Omit<T, keyof IWithLoadUserToLesson>
  ) => {
    const { query } = useRouter()
    const [loading, setLoading] = useState<boolean>()
    const [options, setOptions] = useState<IUserForLesson[]>([])
    const [users, setUsers] = useState<IUserForLesson[]>([])
    const [loadingStudents, setLoadingStudents] = useState<boolean>(false)
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)
    const [modalOpen, setModalOpen] = useState<boolean>(false)

    async function loadStudents() {
      setLoading(true)
      try {
        const response = await studentService.getStudents()

        const options: IUserForLesson[] = response.data
          ? response.data.map((item) => {
              return {
                _id: item._id,
                fullname: item.name + ' ' + item.surname,
                avatar: item.avatar || '',
              }
            })
          : []
        setOptions(options)
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false)
      }
    }

    async function onHandleAddStudent(user: IUserForLesson) {
      const existInArr = users.find((item) => item._id === user._id)
      if (existInArr) {
        setSnackbarOpen(true)
        return
      }
      try {
        await teacherLessonService.addStudentToLesson(
          query._id as string,
          user._id
        )
        loadStudentFromLesson()
      } catch (e) {
        console.log(e)
      }
    }

    async function loadStudentFromLesson() {
      setLoadingStudents(true)
      try {
        const usres = await teacherLessonService.getStudentsFromLesson(
          query._id as string
        )
        setUsers(convertToUserListLesson(usres.data))
      } catch (e) {
        console.log(e)
      } finally {
        setLoadingStudents(false)
      }
    }

    async function onHandleDeleteStudentFromLesson(userId: string) {
      try {
        await teacherLessonService.deleteStudentFromLesson(
          query._id as string,
          userId
        )
        setModalOpen(false)
        loadStudentFromLesson()
      } catch (e) {
        console.log(e)
      }
    }

    useEffect(() => {
      loadStudentFromLesson()
    }, [])

    return (
      <Component
        {...(props as T)}
        notification={snackbarOpen}
        userRole="student"
        loading={loading}
        loadingUsers={loadingStudents}
        users={users}
        options={options}
        modal={modalOpen}
        onStart={loadStudents}
        onHandleAddUser={onHandleAddStudent}
        deleteUserFromLesson={onHandleDeleteStudentFromLesson}
        loadUserFromLesson={loadStudentFromLesson}
      />
    )
  }

  ComponentWithLoadUsers.displayName = `withLoadStudents(${displayName})`

  return ComponentWithLoadUsers
}
