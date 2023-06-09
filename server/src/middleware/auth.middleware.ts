import { Response, NextFunction } from 'express';
import tokenService from '../services/token.service';
import { ITokenData, RequestWithAuthUser } from '../interfaces/token';
import status from '../constants/status';
import responseMessages from '../constants/responseMessages';

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
        .json({ message: responseMessages.unauthorized });
    }

    const userData = await tokenService.validateAccessToken(token);

    if (!userData) {
      return res
        .status(status.BAD_REQUEST)
        .json({ message: responseMessages.destroyedToken });
    }
    req.user = userData as ITokenData;

    return next();
  } catch (err) {
    return res
      .status(status.UNAUTHORIZED)
      .json({ message: responseMessages.unauthorized });
  }
}
