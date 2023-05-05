import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/api-error';
import tokenService from '../services/token.service';

export default async function (req, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'User is not authorized!' });
    }

    const userData = await tokenService.validateAccessToken(token);

    if (!userData)
      return next(ApiError.UnauthorizedError('Token has been destroyed!'));
    req.user = userData;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'User is not authorized!' });
  }
}
