import express from 'express';
import registrationController from '../controllers/registration.controller';
import teacherController from '../controllers/teacher.controller';
import teacherRegistrationMiddleware from '../middleware/teacher-registration.middleware';
import userChangePasswordMiddleware from '../middleware/user-change-password.middleware';
import authMiddleware from '../middleware/auth.middleware';

const router = express.Router();

router.post(
  '/teacher/registration',
  teacherRegistrationMiddleware,
  registrationController.registration
);

router.delete(
  '/teacher/delete-account',
  authMiddleware,
  teacherController.deleteAccount
);

router.post(
  '/teacher/change-password',
  authMiddleware,
  userChangePasswordMiddleware,
  teacherController.changePassword
);

router.post(
  '/teacher/upload-avatar',
  authMiddleware,
  teacherController.uploadAvatar
);

router.get(
  '/teacher/get-account-info',
  authMiddleware,
  teacherController.getAccountInfo
);

router.post(
  '/teacher/update-account-info',
  authMiddleware,
  teacherController.updateAccountInfo
);

// main activity
router.post(
  '/teacher/create-main-field-activity',
  authMiddleware,
  teacherController.createMainFieldActivity
);
router.delete(
  '/teacher/delete-main-field-activity/:id',
  authMiddleware,
  teacherController.deleteMainFieldActivity
);
////////////////

// work experience
router.post(
  '/teacher/create-work-experience',
  authMiddleware,
  teacherController.createWorkExperience
);
router.delete(
  '/teacher/delete-work-experience/:id',
  authMiddleware,
  teacherController.deleteWorkExperience
);
////////////////

router.get(
  '/teacher/get-personal-info',
  authMiddleware,
  teacherController.getPersonalnfo
);

router.post(
  '/teacher/update-personal-lessons',
  authMiddleware,
  teacherController.updatePersonalLessons
);

// payment card
router.post(
  '/teacher/create-payment-card',
  authMiddleware,
  teacherController.createPaymentCard
);
router.delete(
  '/teacher/delete-payment-card',
  authMiddleware,
  teacherController.deletePaymentCard
);
router.get(
  '/teacher/get-payment-card',
  authMiddleware,
  teacherController.getPaymentCard
);
////////////////

// certificate
router.post(
  '/teacher/create-certificate',
  authMiddleware,
  teacherController.createCertificate
);
router.delete(
  '/teacher/delete-certificate/:id',
  authMiddleware,
  teacherController.deleteCertificate
);
////////////////

router.get('/get-teachers', teacherController.getUsers);
router.get('/get-teacher-profile/:id', teacherController.getUserProfile);

// lesson
router.post(
  '/teacher/create-lesson',
  authMiddleware,
  teacherController.createLesson
);
router.post(
  '/teacher/update-lesson',
  authMiddleware,
  teacherController.updateLesson
);
router.delete(
  '/teacher/delete-lesson/:id',
  authMiddleware,
  teacherController.deleteLesson
);
router.get(
  '/teacher/get-lesson/:id',
  authMiddleware,
  teacherController.getLesson
);
router.get(
  '/teacher/get-lessons',
  authMiddleware,
  teacherController.getUserLessons
);
////////////////

// lesson module
router.post(
  '/teacher/create-lesson-module',
  authMiddleware,
  teacherController.createLessonModule
);
router.post(
  '/teacher/update-lesson-module',
  authMiddleware,
  teacherController.updateLessonModule
);
router.delete(
  '/teacher/delete-lesson-module',
  authMiddleware,
  teacherController.deleteLessonModule
);
router.get(
  '/teacher/get-lesson-module/:id',
  authMiddleware,
  teacherController.getLessonModule
);
router.get(
  '/teacher/get-modules-lesson/:id',
  authMiddleware,
  teacherController.getModulesFromLesson
);
////////////////

// students for lesson
router.post(
  '/teacher/add-student-to-lesson',
  authMiddleware,
  teacherController.addStudentToLesson
);
router.delete(
  '/teacher/delete-student-from-lesson',
  authMiddleware,
  teacherController.deleteStudentFromLesson
);
router.get(
  '/teacher/get-students-from-lesson/:id',
  authMiddleware,
  teacherController.getStudentsFromLesson
);
////////////////

export default router;
