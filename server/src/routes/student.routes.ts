import express from 'express';
import studentController from '../controllers/student.controller';
import registrationController from '../controllers/registration.controller';
import studentRegistrationMiddleware from '../middleware/student-registration.middleware';
import userChangePasswordMiddleware from '../middleware/user-change-password.middleware';
import authMiddleware from '../middleware/auth.middleware';

const router = express.Router();

router.post(
  '/registration/student',
  studentRegistrationMiddleware,
  registrationController.registration
);

router.delete('/delete/student', authMiddleware, studentController.removeUser);

router.post(
  '/update-password/student',
  authMiddleware,
  userChangePasswordMiddleware,
  studentController.changePassword
);

router.post(
  '/user-info/student',
  authMiddleware,
  studentController.updateUserInfo
);

router.post(
  '/upload-avatar/student',
  authMiddleware,
  studentController.uploadUserAvatar
);

router.get('/user-info/student', authMiddleware, studentController.getUserInfo);

router.post(
  '/add-subject/student',
  authMiddleware,
  studentController.addSubject
);

router.delete(
  '/remove-subject/student/:id',
  authMiddleware,
  studentController.removeSubject
);

router.get(
  '/get-subjects/student',
  authMiddleware,
  studentController.getSubjects
);

router.get('/get-students', authMiddleware, studentController.getUsers);

export default router;
