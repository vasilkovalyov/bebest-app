import { Request, Response, NextFunction } from 'express';
import studentRegistrationSchema from '../validations/student-registration.validation';
import status from '../constants/status';

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> {
  const { error } = studentRegistrationSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res.status(status.BAD_REQUEST).json({ error: error.message });
  }
  return next();
}
