import { Request, Response, NextFunction } from 'express';
import studentRegistrationSchema from '../validations/user-login.validation';

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> {
  const { error } = studentRegistrationSchema.validate(req.query, {
    abortEarly: false,
  });
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  return next();
}
