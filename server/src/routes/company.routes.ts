import express from 'express';
import companyController from '../controllers/company.controller';
import registrationController from '../controllers/registration.controller';
import companyRegistrationMiddleware from '../middleware/company-registration.middleware';
import userChangePasswordMiddleware from '../middleware/user-change-password.middleware';
import authMiddleware from '../middleware/auth.middleware';

const router = express.Router();

router.post(
  '/registration/company',
  companyRegistrationMiddleware,
  registrationController.registration
);

router.delete('/delete/company', authMiddleware, companyController.removeUser);

router.post(
  '/update-password/company',
  authMiddleware,
  userChangePasswordMiddleware,
  companyController.changePassword
);

router.get('/user-info/company', authMiddleware, companyController.getUserInfo);

router.post(
  '/upload-avatar/company',
  authMiddleware,
  companyController.uploadUserAvatar
);

router.post(
  '/user-info/company',
  authMiddleware,
  companyController.updateUserInfo
);

export default router;
