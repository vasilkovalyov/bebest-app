import { IUserСertificate } from '@/services/teacher-certificates'

export interface ITeacherСertificates {
  certificates: IUserСertificate[] | []
}

export interface ITeacherСertificatesFormProps {
  onHandleClose: () => void
}
