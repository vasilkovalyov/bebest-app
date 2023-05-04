import { Request, Response } from 'express';
import { UserRole } from 'types/role';

import RegistrationStrategy from '../services/registration/registration';
import StudentRegistration from '../services/registration/student.registration';

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

      if (!strategy) {
        return res.status(400).json({
          data: 'error',
        });
      }

      const response = await strategy.registration();

      return res.status(response.status).json(response);
    } catch (e) {
      if (!(e instanceof Error)) return;
      return res.status(400).json({
        data: e.message,
      });
    }
  }
}

export default new RegistrationController();
