import express from 'express';
import studentController from '../controllers/student.controller';
import registrationController from '../controllers/registration.controller';
import studentRegistrationMiddleware from '../middleware/student-registration.middleware';
import userChangePasswordMiddleware from '../middleware/user-change-password.middleware';
import authMiddleware from '../middleware/auth.middleware';

const router = express.Router();

router.post(
  '/registration-student',
  studentRegistrationMiddleware,
  registrationController.registration
);

router.delete('/delete-student', authMiddleware, studentController.removeUser);

router.post(
  '/student/update-password',
  authMiddleware,
  userChangePasswordMiddleware,
  studentController.changePassword
);

router.post(
  '/student/update-account-info',
  authMiddleware,
  studentController.updateUserInfo
);

router.get(
  '/student/get-account-info',
  authMiddleware,
  studentController.getUserInfo
);

router.post(
  '/student/upload-avatar',
  authMiddleware,
  studentController.uploadUserAvatar
);

router.post(
  '/student/create-subject',
  authMiddleware,
  studentController.addSubject
);

router.delete(
  '/student/delete-subject/:id',
  authMiddleware,
  studentController.removeSubject
);

router.get(
  '/student/get-subjects',
  authMiddleware,
  studentController.getSubjects
);

router.get('/get-students', authMiddleware, studentController.getUsers);

export default router;
