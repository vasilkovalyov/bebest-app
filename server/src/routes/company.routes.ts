import express from 'express';
import companyController from '../controllers/company.controller';
import registrationController from '../controllers/registration.controller';
import companyRegistrationMiddleware from '../middleware/company-registration.middleware';
import userChangePasswordMiddleware from '../middleware/user-change-password.middleware';
import authMiddleware from '../middleware/auth.middleware';

const router = express.Router();

router.post(
  '/registration-company',
  companyRegistrationMiddleware,
  registrationController.registration
);

router.delete('/delete-company', authMiddleware, companyController.removeUser);

router.post(
  '/company/update-password',
  authMiddleware,
  userChangePasswordMiddleware,
  companyController.changePassword
);

router.get(
  '/company/get-account-info',
  authMiddleware,
  companyController.getUserInfo
);

router.post(
  '/company/upload-avatar',
  authMiddleware,
  companyController.uploadUserAvatar
);

router.post(
  '/company/update-account-info',
  authMiddleware,
  companyController.updateUserInfo
);

export default router;
