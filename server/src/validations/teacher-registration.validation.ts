import Joi from 'joi';
import { ITeacherRegistrationProps } from '../services/registration/teacher.registration';
import validationMessages from '../constants/validationMessages';
import { passwordRegex } from './password';

const studentRegistrationSchema = Joi.object<ITeacherRegistrationProps>({
  name: Joi.string().required().messages({
    'string.empty': validationMessages.nameValid,
  }),
  surname: Joi.string().required().messages({
    'string.empty': validationMessages.surnameValid,
  }),
  email: Joi.string().required().email().messages({
    'string.email': validationMessages.emailValid,
  }),
  password: Joi.string()
    .required()
    .pattern(new RegExp(passwordRegex))
    .message(
      'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character (!@#$%^&*)'
    ),
  confirm_password: Joi.string().required().valid(Joi.ref('password')),
});

export default studentRegistrationSchema;
