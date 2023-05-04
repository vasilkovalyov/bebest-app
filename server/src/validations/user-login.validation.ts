import Joi from 'joi';
import { IStudentRegistrationProps } from '../services/registration/student.registration';
import validationMessages from '../constants/validationMessages';
import { passwordRegex } from './password';

const studentRegistrationSchema = Joi.object<IStudentRegistrationProps>({
  email: Joi.string().required().email().messages({
    'string.email': validationMessages.emailValid,
  }),
  password: Joi.string()
    .required()
    .pattern(new RegExp(passwordRegex))
    .message(
      'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character (!@#$%^&*)'
    ),
});

export default studentRegistrationSchema;
