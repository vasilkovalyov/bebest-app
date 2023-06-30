import express from 'express';
import registrationController from '../controllers/registration.controller';
import teacherController from '../controllers/teacher.controller';
import teacherRegistrationMiddleware from '../middleware/teacher-registration.middleware';
import userChangePasswordMiddleware from '../middleware/user-change-password.middleware';
import authMiddleware from '../middleware/auth.middleware';

const router = express.Router();

router.post(
  '/registration-teacher',
  teacherRegistrationMiddleware,
  registrationController.registration
);

router.delete('/delete-teacher', authMiddleware, teacherController.removeUser);

router.post(
  '/teacher/update-password',
  authMiddleware,
  userChangePasswordMiddleware,
  teacherController.changePassword
);

router.post(
  '/teacher/upload-avatar',
  authMiddleware,
  teacherController.uploadUserAvatar
);

router.get(
  '/teacher/get-account-info',
  authMiddleware,
  teacherController.getUserInfo
);

router.post(
  '/teacher/update-account-info',
  authMiddleware,
  teacherController.updateUserInfo
);

// main activity
router.post(
  '/teacher/create-main-field-activity',
  authMiddleware,
  teacherController.addMainFieldsActivity
);
router.delete(
  '/teacher/delete-main-field-activity/:id',
  authMiddleware,
  teacherController.removeMainFieldsActivity
);
////////////////

// work experience
router.post(
  '/teacher/create-work-experience',
  authMiddleware,
  teacherController.addWorkExperience
);
router.delete(
  '/teacher/delete-work-experience/:id',
  authMiddleware,
  teacherController.removeWorkExperience
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
  teacherController.addPaymentCard
);
router.delete(
  '/teacher/delete-payment-card',
  authMiddleware,
  teacherController.removePaymentCard
);
router.get(
  '/teacher/get-payment-card',
  authMiddleware,
  teacherController.getPaymentCard
);
////////////////

// certificate
router.post(
  '/teacher/upload-certificate',
  authMiddleware,
  teacherController.uploadCertificate
);

router.delete(
  '/teacher/remove-certificate/:id',
  authMiddleware,
  teacherController.removeCertificate
);
////////////////

router.get('/get-teachers', teacherController.getUsers);
router.get('/teacher-profile/:id', teacherController.getTeacherProfile);

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
////////////////

router.get(
  '/get-modules-lesson/teacher/:id',
  authMiddleware,
  teacherController.getModulesLesson
);

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
  '/get-students-from-lesson/:id',
  authMiddleware,
  teacherController.getStudentsFromLesson
);
////////////////

export default router;
