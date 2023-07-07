// libs
import { useState, useEffect } from 'react'

//redux
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@/redux/hooks'
import { fetchTeacherPersonalInfo } from '@/redux/slices/teacher-personal-info'
import { IFieldActivity, IFieldActivityRequest } from '@/types/common'
import { useLoadUserInfo } from '@/hooks/useLoadUserInfo'

//services
import userFieldsActivityService from '@/services/user-fields-activity'

// relate utils
import {
  IUserFieldsActivityInfo,
  ISkillsChecked,
  ISubjectsActivities,
} from './UserFieldsActivity.type'
import {
  getFieldsAndSubjectsData,
  getUpdatedCheckedSkills,
} from './UserFieldsActivity.utils'

//other utils
import { UserRole } from '@/types/role'
import { ISubject, ISubjectCategory } from '@/types/subjects'

type FieldActivityForRemoveType = {
  id: string
  index: number
}

type UseUserFieldsActivityReturnType = {
  subjects: ISubject[]
  checkedSkills: ISkillsChecked[]
  selectedSkills: ISubjectsActivities[]
  selectRemoveFieldActivity: FieldActivityForRemoveType
  fieldsActivityStore: IFieldActivity[]
  setSelectRemoveFieldActivity: (props: FieldActivityForRemoveType) => void
  createActivity: (
    data: IUserFieldsActivityInfo,
    role: UserRole
  ) => Promise<unknown>
  changeActivity: (activity: string, index: number) => void
  deleteActivity: (userRole: UserRole) => Promise<unknown>
  getSubjectByActivityName: (activity: string) => ISubject[]
  changeAndUpdatedSkills: (values: string[], index: number) => ISkillsChecked[]
}

export function useUserFieldsActivity(): UseUserFieldsActivityReturnType {
  const [checkedSkills, setCheckedSkills] = useState<ISkillsChecked[] | []>([])
  const subjects = useAppSelector((store) => store.subjects.subjects)
  const fieldsActivityStore = useAppSelector(
    (store) => store.teacherPersonalInfo.fields_activity
  )
  const dispatch = useDispatch<any>()
  const { loadUserInfo } = useLoadUserInfo()
  const [selectedSkills, setSelectedSkills] = useState<
    ISubjectsActivities[] | []
  >([])
  const [selectRemoveFieldActivity, setSelectRemoveFieldActivity] = useState<{
    id: string
    index: number
  }>({
    id: '',
    index: -1,
  })

  useEffect(() => {
    loadSubjects()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function createActivity(data: IUserFieldsActivityInfo, role: UserRole) {
    return new Promise(async (resolve, reject) => {
      try {
        const fieldsActivity = {
          ...data.fields_activity[data.fields_activity.length - 1],
        }

        const props: IFieldActivityRequest = {
          subject: fieldsActivity._id || '',
          categories: checkedSkills[checkedSkills.length - 1].subjects.map(
            (item) => item._id
          ),
        }

        await userFieldsActivityService.createMainFieldsActivity(props, role)

        dispatch(fetchTeacherPersonalInfo())
        loadUserInfo(role)
        setSelectedSkills((prevState) => [...prevState, { subjects: [] }])
        resolve(true)
      } catch (e) {
        reject(e)
      }
    })
  }

  async function deleteActivity(role: UserRole) {
    return new Promise(async (resolve, reject) => {
      try {
        await userFieldsActivityService.deleteMainFieldsActivity(
          selectRemoveFieldActivity.id,
          role
        )
        dispatch(fetchTeacherPersonalInfo())
        loadUserInfo(role)
        setSelectRemoveFieldActivity({
          id: '',
          index: -1,
        })

        deleteCheckedSkill()
        deleteSelectedSkill()
        resolve(true)
      } catch (e) {
        reject(e)
      }
    })
  }

  const getSubjectByActivityName = (activity: string) => {
    return subjects.filter((item) => {
      if (item.subject === activity) return item
    })
  }

  function changeActivity(activity: string, index: number) {
    let tempArr = [...selectedSkills]
    let checkedSkillsArr = [...checkedSkills]

    const activitySubjects = getSubjectByActivityName(activity)

    if (tempArr.length === 0 && checkedSkillsArr.length === 0) {
      tempArr.push({ subjects: activitySubjects[0].categories })
    } else {
      tempArr = tempArr.map((item, key) => {
        if (index !== key) return item
        return { subjects: activitySubjects[0].categories }
      })

      checkedSkillsArr = checkedSkillsArr.map((item, key) => {
        if (index !== key) return item
        item = { subjects: [] }
        return item
      })
    }

    setSelectedSkills(tempArr)
    setCheckedSkills(checkedSkillsArr)
  }

  function changeAndUpdatedSkills(
    values: string[],
    index: number
  ): ISkillsChecked[] {
    const categories: ISubjectCategory[] = []

    values.forEach((item) => {
      if (!item) return

      const subject = selectedSkills[selectedSkills.length - 1].subjects.find(
        (skill) => skill.category === item
      )
      if (subject) {
        categories.push(subject)
      }
    })

    const updatedCheckedSkills = getUpdatedCheckedSkills(
      checkedSkills,
      categories,
      index
    )

    setCheckedSkills(updatedCheckedSkills)

    return updatedCheckedSkills
  }

  function loadSubjects() {
    if (!fieldsActivityStore.length) return
    const { subjectArr, checkedSubjectArr } = getFieldsAndSubjectsData(
      fieldsActivityStore,
      subjects
    )
    setSelectedSkills(subjectArr)
    setCheckedSkills(checkedSubjectArr)
  }

  function deleteCheckedSkill() {
    const checkedArr = checkedSkills.filter((item, key) => {
      if (key !== selectRemoveFieldActivity.index) return item
    })
    setCheckedSkills(checkedArr)
  }

  function deleteSelectedSkill() {
    const selectedSkillsArr = selectedSkills.filter((item, key) => {
      if (key !== selectRemoveFieldActivity.index) return item
    })
    setSelectedSkills(selectedSkillsArr)
  }

  return {
    checkedSkills,
    selectedSkills,
    subjects,
    selectRemoveFieldActivity,
    fieldsActivityStore,
    setSelectRemoveFieldActivity,
    createActivity,
    changeActivity,
    getSubjectByActivityName,
    deleteActivity,
    changeAndUpdatedSkills,
  }
}
