import { IСertificate } from '@/types/common'

export interface ITeacherСertificates {
  certificates: IСertificate[] | []
}

export interface ITeacherСertificatesFormProps {
  onHandleClose: () => void
}
