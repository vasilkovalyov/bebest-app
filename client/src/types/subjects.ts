export interface ISubjectCategory {
  _id: string
  category: string
}

export interface ISubject {
  _id: string
  subject: string
  categories: ISubjectCategory[] | []
}
