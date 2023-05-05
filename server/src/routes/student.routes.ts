import express from 'express';
import StudentController from '../controllers/student.controller';
import RegistrationController from '../controllers/registration.controller';
import studentRegistrationMiddleware from '../middleware/student-registration.middleware';
import userChangePasswordMiddleware from '../middleware/user-change-password.middleware';

const router = express.Router();

router.post(
  '/registration/student',
  studentRegistrationMiddleware,
  RegistrationController.registration
);

router.delete('/delete/student', StudentController.removeUser);
router.post(
  '/update-password/student',
  userChangePasswordMiddleware,
  StudentController.changePassword
);

router.post('/add-student', StudentController.addUser);

export default router;
