import express from 'express';
import registrationController from '../controllers/registration.controller';
import teacherController from '../controllers/teacher.controller';
import teacherRegistrationMiddleware from '../middleware/teacher-registration.middleware';
import userChangePasswordMiddleware from '../middleware/user-change-password.middleware';
import authMiddleware from '../middleware/auth.middleware';

const router = express.Router();

router.post(
  '/registration/teacher',
  teacherRegistrationMiddleware,
  registrationController.registration
);

router.delete('/delete/teacher', authMiddleware, teacherController.removeUser);

router.post(
  '/update-password/teacher',
  authMiddleware,
  userChangePasswordMiddleware,
  teacherController.changePassword
);

router.get('/user-info/teacher', authMiddleware, teacherController.getUserInfo);

router.post(
  '/upload-avatar/teacher',
  authMiddleware,
  teacherController.uploadUserAvatar
);

router.post(
  '/user-info/teacher',
  authMiddleware,
  teacherController.updateUserInfo
);

router.post(
  '/main-fields-activity/teacher',
  authMiddleware,
  teacherController.addMainFieldsActivity
);

router.delete(
  '/main-fields-activity/teacher/:id',
  authMiddleware,
  teacherController.removeMainFieldsActivity
);

router.post(
  '/personal-lessons/teacher',
  authMiddleware,
  teacherController.updatePersonalLessons
);

router.post(
  '/work-experience/teacher',
  authMiddleware,
  teacherController.addWorkExperience
);

router.delete(
  '/work-experience/teacher/:id',
  authMiddleware,
  teacherController.removeWorkExperience
);

router.get(
  '/personal-info/teacher',
  authMiddleware,
  teacherController.getPersonalnfo
);

router.post(
  '/payment-card/teacher',
  authMiddleware,
  teacherController.addPaymentCard
);
router.delete(
  '/payment-card/teacher',
  authMiddleware,
  teacherController.removePaymentCard
);

router.get(
  '/payment-card/teacher',
  authMiddleware,
  teacherController.getPaymentCard
);

router.post(
  '/upload-certificate/teacher',
  authMiddleware,
  teacherController.uploadCertificate
);

router.delete(
  '/upload-certificate/teacher/:id',
  authMiddleware,
  teacherController.removeCertificate
);

router.get('/teachers', teacherController.getUsers);
router.get('/teacher-profile/:id', teacherController.getTeacherProfile);

export default router;
