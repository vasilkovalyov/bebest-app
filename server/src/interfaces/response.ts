import { UserRole } from '../types/role';
export interface IRegistrationResponse {
  status: number;
  data: {
    _id: string;
    email: string;
    role: UserRole;
  };
  message: string;
}

export interface ILoginResponse {
  userId: string;
  token: string;
  role: UserRole;
}
