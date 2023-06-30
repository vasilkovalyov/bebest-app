import express from 'express';
import studentController from '../controllers/student.controller';
import registrationController from '../controllers/registration.controller';
import studentRegistrationMiddleware from '../middleware/student-registration.middleware';
import userChangePasswordMiddleware from '../middleware/user-change-password.middleware';
import authMiddleware from '../middleware/auth.middleware';

const router = express.Router();

router.post(
  '/student/registration',
  studentRegistrationMiddleware,
  registrationController.registration
);

router.delete(
  '/student/delete-account',
  authMiddleware,
  studentController.deleteAccount
);

router.post(
  '/student/change-password',
  authMiddleware,
  userChangePasswordMiddleware,
  studentController.changePassword
);

router.post(
  '/student/update-account-info',
  authMiddleware,
  studentController.updateAccountInfo
);

router.get(
  '/student/get-account-info',
  authMiddleware,
  studentController.getAccountInfo
);

router.post(
  '/student/upload-avatar',
  authMiddleware,
  studentController.uploadAvatar
);

router.post(
  '/student/create-subject',
  authMiddleware,
  studentController.createSubject
);

router.delete(
  '/student/delete-subject/:id',
  authMiddleware,
  studentController.deleteSubject
);

router.get(
  '/student/get-subjects',
  authMiddleware,
  studentController.getSubjects
);

router.get('/get-students', authMiddleware, studentController.getUsers);

export default router;
