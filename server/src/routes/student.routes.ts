import express from 'express';
import StudentController from '../controllers/student.controller';
import RegistrationController from '../controllers/registration.controller';
import studentRegistrationMiddleware from '../middleware/student-registration.middleware';
import userChangePasswordMiddleware from '../middleware/user-change-password.middleware';
import authMiddleware from '../middleware/auth.middleware';

const router = express.Router();

router.post(
  '/registration/student',
  studentRegistrationMiddleware,
  RegistrationController.registration
);

router.delete('/delete/student', authMiddleware, StudentController.removeUser);

router.post(
  '/update-password/student',
  authMiddleware,
  userChangePasswordMiddleware,
  StudentController.changePassword
);

router.get('/user-info/student', authMiddleware, StudentController.getUserInfo);

export default router;
