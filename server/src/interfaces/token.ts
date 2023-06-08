import { UserRole } from 'types/role';
import { Request, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface ITokenData {
  _id: string;
  role: UserRole;
  iat: number;
  exp: number;
}

export interface RequestWithAuthUser extends Request {
  user?: ITokenData | null;
}
