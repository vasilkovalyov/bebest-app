import { Request, Response } from 'express';
import { UserRole } from 'types/role';

import RegistrationStrategy from '../services/registration/registration';
import StudentRegistration from '../services/registration/student.registration';
import TeacherRegistration from '../services/registration/teacher.registration';

class RegistrationController {
  async registration(req: Request, res: Response) {
    try {
      const role: UserRole = req.route.path.split('/')[2];
      const strategy = new RegistrationStrategy(
        new StudentRegistration(req.body)
      );

      if (role === 'student') {
        strategy.setStrategy(new StudentRegistration(req.body));
        strategy.successMessage = 'Student was created successfull';
      }
      if (role === 'teacher') {
        strategy.setStrategy(new TeacherRegistration(req.body));
        strategy.successMessage = 'Teacher was created successfull';
      }

      if (!strategy) {
        return res.status(400).json({
          message: 'Error',
        });
      }

      const response = await strategy.registration();

      return res.status(200).json(response);
    } catch (e) {
      if (!(e instanceof Error)) return;
      return res.status(400).json({
        message: e.message,
      });
    }
  }
}

export default new RegistrationController();
