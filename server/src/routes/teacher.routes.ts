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

router.delete('/delete/teacher', authMiddleware, TeacherController.removeUser);

router.post(
  '/update-password/teacher',
  authMiddleware,
  userChangePasswordMiddleware,
  TeacherController.changePassword
);

router.get('/user-info/teacher', authMiddleware, TeacherController.getUserInfo);

router.post(
  '/upload-avatar/teacher',
  authMiddleware,
  TeacherController.uploadUserAvatar
);

router.post(
  '/user-info/teacher',
  authMiddleware,
  TeacherController.updateUserInfo
);

router.post(
  '/main-fields-activity/teacher',
  authMiddleware,
  TeacherController.addMainFieldsActivity
);

router.delete(
  '/main-fields-activity/teacher/:id',
  authMiddleware,
  TeacherController.removeMainFieldsActivity
);

router.post(
  '/personal-lessons/teacher',
  authMiddleware,
  TeacherController.updatePersonalLessons
);

router.post(
  '/work-experience/teacher',
  authMiddleware,
  TeacherController.addWorkExperience
);

router.delete(
  '/work-experience/teacher/:id',
  authMiddleware,
  TeacherController.removeWorkExperience
);

router.get(
  '/personal-info/teacher',
  authMiddleware,
  TeacherController.getPersonalnfo
);

router.post(
  '/payment-card/teacher',
  authMiddleware,
  TeacherController.addPaymentCard
);
router.delete(
  '/payment-card/teacher',
  authMiddleware,
  TeacherController.removePaymentCard
);

router.get('/payment-card/teacher', TeacherController.getPaymentCard);

router.post(
  '/upload-certificate/teacher',
  authMiddleware,
  TeacherController.uploadCertificate
);

router.delete(
  '/upload-certificate/teacher/:id',
  authMiddleware,
  TeacherController.removeCertificate
);

export default router;
