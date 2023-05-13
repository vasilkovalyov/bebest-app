import Joi from 'joi';
import validationMessages from '../constants/validationMessages';
import { passwordRegex } from './password';

const changePassowrdSchema = Joi.object({
  _id: Joi.string().required().messages({
    'string.empty': validationMessages.userIdValid,
  }),
  password: Joi.string()
    .required()
    .pattern(new RegExp(passwordRegex))
    .messages({
      'string.empty': validationMessages.passwordValid,
      'string.pattern.base': validationMessages.passwordPatternValid,
    }),
});

export default changePassowrdSchema;
