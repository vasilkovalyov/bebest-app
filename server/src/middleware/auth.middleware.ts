import { Response, NextFunction } from 'express';
import tokenService from '../services/token.service';
import { ITokenData, RequestWithAuthUser } from '../interfaces/token';
import status from '../constants/status';

export default async function (
  req: RequestWithAuthUser,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization;
    console.log(token);
    if (!token) {
      return res
        .status(status.UNAUTHORIZED)
        .json({ message: 'User is not authorized!' });
    }

    const userData = await tokenService.validateAccessToken(token);

    if (!userData) {
      return res
        .status(status.BAD_REQUEST)
        .json({ message: 'Token has destroyed!' });
    }
    req.user = userData as ITokenData;

    return next();
  } catch (err) {
    return res
      .status(status.UNAUTHORIZED)
      .json({ message: 'User is not authorized!' });
  }
}
