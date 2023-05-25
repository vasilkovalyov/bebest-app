import { UserRole } from 'types/role';

export interface ITokenData {
  _id: string;
  role: UserRole;
  iat: number;
  exp: number;
}
