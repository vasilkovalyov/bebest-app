import express from 'express';
import RegistrationController from '../controllers/registration.controller';
import TeacherController from '../controllers/teacher.controller';
import teacherRegistrationMiddleware from '../middleware/teacher-registration.middleware';
import userChangePasswordMiddleware from '../middleware/user-change-password.middleware';
import authMiddleware from '../middleware/auth.middleware';

const router = express.Router();

router.post(
  '/registration/teacher',
  teacherRegistrationMiddleware,
  RegistrationController.registration
);

router.delete(
  '/delete/teacher/:id',
  authMiddleware,
  TeacherController.removeUser
);

router.post(
  '/update-password/teacher',
  authMiddleware,
  userChangePasswordMiddleware,
  TeacherController.changePassword
);

router.get('/user-info/teacher', authMiddleware, TeacherController.getUserInfo);

router.post(
  '/user-info/teacher',
  authMiddleware,
  TeacherController.updateUserInfo
);

export default router;
