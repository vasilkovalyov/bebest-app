import { ISubject, ISubjectCategory } from '@/types/subjects'
import { ISkillsChecked, ISubjectsActivities } from './UserFieldsActivity.type'
import { IFieldActivity } from '@/types/common'

export function getFieldsAndSubjectsData(
  fields: IFieldActivity[],
  subjects: ISubject[]
): { subjectArr: ISubjectsActivities[]; checkedSubjectArr: ISkillsChecked[] } {
  const subjectArr: ISubjectsActivities[] = []
  const checkedSubjectArr: ISkillsChecked[] = []

  for (let key in fields) {
    const formItem = fields[key]

    checkedSubjectArr[key] = {
      subjects: formItem.categories,
    }

    for (let subjectKey in subjects) {
      if (subjects[subjectKey].subject === formItem.subject) {
        subjectArr.push({
          subjects: subjects[subjectKey].categories,
        })
      }
    }
  }

  subjectArr.push({
    subjects: [],
  })

  return {
    subjectArr,
    checkedSubjectArr,
  }
}

export function getUpdatedCheckedSkills(
  data: ISkillsChecked[],
  categories: ISubjectCategory[],
  index: number
): ISkillsChecked[] {
  const updatedSkillsArr = categories.filter((item) => item.category !== '')
  const dataCopy: ISkillsChecked[] = [...data]

  if (dataCopy.length > 0 || dataCopy.length === index) {
    dataCopy[index] = {
      subjects: updatedSkillsArr,
    }
  } else {
    for (let key in dataCopy) {
      if (index === parseInt(key)) {
        dataCopy[key] = {
          subjects: updatedSkillsArr,
        }
      }
    }
  }

  return dataCopy
}

export function getIdsFromFieldsActivity() {}
