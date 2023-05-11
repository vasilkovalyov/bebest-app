import { UserRole } from '../types/role';
export interface IRegistrationResponse {
  message: string;
}

export interface ILoginResponse {
  userId: string;
  token: string;
  role: UserRole;
}
