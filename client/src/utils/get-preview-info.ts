import { IPreviewUserAccountItem } from '@/components/Previews/PreviewUserAccount/PreviewUserAccount.type'
import { IStudentSubject } from '@/redux/slices/student-subjects'

export function getPreviewInfo(
  subjects: IStudentSubject[]
): IPreviewUserAccountItem[] {
  const newSubjects: IPreviewUserAccountItem[] = []
  for (let item of subjects) {
    const subjectObj: IPreviewUserAccountItem = {
      title: 'Subject',
      name: item.subject_study,
    }
    const subjectLevelObj: IPreviewUserAccountItem = {
      title: 'The level of mastery of the subject',
      name: item.level_mastery_subject,
    }
    newSubjects.push(subjectObj)
    newSubjects.push(subjectLevelObj)
  }
  return newSubjects
}
