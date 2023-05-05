import { Request, Response, NextFunction } from 'express';
import changePasswordSchema from '../validations/change-password';

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> {
  const { error } = changePasswordSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
  return next();
}
