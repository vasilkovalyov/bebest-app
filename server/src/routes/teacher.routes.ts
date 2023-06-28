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

router.post(
  '/create-lesson/teacher',
  authMiddleware,
  teacherController.createLesson
);

router.post(
  '/update-lesson/teacher',
  authMiddleware,
  teacherController.updateLesson
);

router.delete(
  '/delete-lesson/teacher/:id',
  authMiddleware,
  teacherController.deleteLesson
);

router.get(
  '/get-lesson/teacher/:id',
  authMiddleware,
  teacherController.getLesson
);

router.get(
  '/get-lessons/teacher',
  authMiddleware,
  teacherController.getUserLessons
);

router.post(
  '/create-lesson-module/teacher',
  authMiddleware,
  teacherController.createLessonModule
);

router.post(
  '/update-lesson-module/teacher',
  authMiddleware,
  teacherController.updateLessonModule
);

router.delete(
  '/delete-lesson-module/teacher',
  authMiddleware,
  teacherController.deleteLessonModule
);

router.get(
  '/get-lesson-module/teacher/:id',
  authMiddleware,
  teacherController.getLessonModule
);

router.get(
  '/get-modules-lesson/teacher/:id',
  authMiddleware,
  teacherController.getModulesLesson
);

router.post(
  '/add-student-to-lesson',
  authMiddleware,
  teacherController.addStudentToLesson
);
router.delete(
  '/delete-student-from-lesson',
  authMiddleware,
  teacherController.deleteStudentFromLesson
);
router.get(
  '/get-students-from-lesson/:id',
  authMiddleware,
  teacherController.getStudentsFromLesson
);

export default router;
