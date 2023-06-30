import express from 'express';
import companyController from '../controllers/company.controller';
import registrationController from '../controllers/registration.controller';
import companyRegistrationMiddleware from '../middleware/company-registration.middleware';
import userChangePasswordMiddleware from '../middleware/user-change-password.middleware';
import authMiddleware from '../middleware/auth.middleware';

const router = express.Router();

router.post(
  '/company/registration',
  companyRegistrationMiddleware,
  registrationController.registration
);

router.delete(
  '/company/delete-account',
  authMiddleware,
  companyController.deleteAccount
);

router.post(
  '/company/change-password',
  authMiddleware,
  userChangePasswordMiddleware,
  companyController.changePassword
);

router.get(
  '/company/get-account-info',
  authMiddleware,
  companyController.getAccountInfo
);

router.post(
  '/company/upload-avatar',
  authMiddleware,
  companyController.uploadAvatar
);

router.post(
  '/company/update-account-info',
  authMiddleware,
  companyController.updateAccountInfo
);

export default router;
