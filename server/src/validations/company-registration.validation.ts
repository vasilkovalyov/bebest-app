import Joi from 'joi';
import { ICompanyRegistrationProps } from '../services/registration/company.registration';
import validationMessages from '../constants/validationMessages';
import { passwordRegex } from './password';

const companyRegistrationSchema = Joi.object<ICompanyRegistrationProps>({
  company_name: Joi.string().required().messages({
    'string.empty': validationMessages.companyNameValid,
  }),
  admin_name: Joi.string().required().messages({
    'string.empty': validationMessages.nameValid,
  }),
  admin_surname: Joi.string().required().messages({
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

export default companyRegistrationSchema;
