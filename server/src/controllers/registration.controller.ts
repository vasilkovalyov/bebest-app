import { Request, Response } from 'express';
import { UserRole } from 'types/role';

import RegistrationStrategy from '../services/registration/registration';
import StudentRegistration from '../services/registration/student.registration';
import TeacherRegistration from '../services/registration/teacher.registration';
import status from '../constants/status';
import responseStudentMessages from '../constants/responseStudentMessages';
import responseTeacherMessages from '../constants/responseTeacherMessages';

class RegistrationController {
  async registration(req: Request, res: Response) {
    try {
      const role: UserRole = req.route.path.split('/')[2];
      const strategy = new RegistrationStrategy(
        new StudentRegistration(req.body)
      );

      if (role === 'student') {
        strategy.setStrategy(new StudentRegistration(req.body));
        strategy.successMessage = responseStudentMessages.createSuccessful;
      }
      if (role === 'teacher') {
        strategy.setStrategy(new TeacherRegistration(req.body));
        strategy.successMessage = responseTeacherMessages.createSuccessful;
      }

      if (!strategy) {
        return res.status(status.BAD_REQUEST).json({
          message: 'Error',
        });
      }

      const response = await strategy.registration();

      return res.status(status.SUCCESS).json(response);
    } catch (e) {
      if (!(e instanceof Error)) return;
      return res.status(status.BAD_REQUEST).json({
        message: e.message,
      });
    }
  }
}

export default new RegistrationController();
