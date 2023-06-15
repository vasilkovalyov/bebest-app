import { ISubject } from '@/services/subjects'
import { IUserFieldActivity } from '@/services/user-fields-activity'
import { ISkillsChecked, ISubjectsActivities } from './UserFieldsActivity.type'

export function getFieldsAndSubjectsData(
  fields: IUserFieldActivity[],
  subjects: ISubject[]
): { subjectArr: ISubjectsActivities[]; checkedSubjectArr: ISkillsChecked[] } {
  const subjectArr: ISubjectsActivities[] = []
  const checkedSubjectArr: ISkillsChecked[] = []

  for (let key in fields) {
    const formItem = fields[key]

    checkedSubjectArr[key] = {
      subjects: formItem.skills,
    }

    for (let subjectKey in subjects) {
      if (subjects[subjectKey].category === formItem.activity) {
        subjectArr.push({
          subjects: subjects[subjectKey].children,
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
  skills: string[],
  index: number
): ISkillsChecked[] {
  const updatedSkillsArr = skills.filter((item: string) => item !== '')
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
