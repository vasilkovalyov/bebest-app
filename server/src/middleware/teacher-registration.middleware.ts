import { Request, Response, NextFunction } from 'express';
import teacherRegistrationSchema from '../validations/teacher-registration.validation';

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> {
  const { error } = teacherRegistrationSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  return next();
}
