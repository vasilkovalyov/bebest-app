import { Request, Response, NextFunction } from 'express';
import tokenService from '../services/token.service';

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'User is not authorized!' });
    }

    const userData = await tokenService.validateAccessToken(token);

    if (!userData) {
      return res.status(401).json({ message: 'Token has been destroyed!' });
    }

    return next();
  } catch (err) {
    return res.status(401).json({ message: 'User is not authorized!' });
  }
}
