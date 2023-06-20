export interface ISubjectSkill {
  _id: string
  subject: string
}

export interface ISubject {
  _id: string
  category: string
  children: ISubjectSkill[] | []
}
