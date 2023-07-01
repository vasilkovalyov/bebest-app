import { Request, Response } from 'express';
import { UserRole } from 'types/role';

import RegistrationStrategy from '../services/registration/registration';
import StudentRegistration, {
  IRegistrationStudentProps,
} from '../services/registration/student.registration';
import TeacherRegistration, {
  ITeacherRegistrationProps,
} from '../services/registration/teacher.registration';
import CompanyRegistration, {
  ICompanyRegistrationProps,
} from '../services/registration/company.registration';
import { userCreateSuccessfull } from '../constants/responseMessages';
import status from '../constants/status';

class RegistrationController {
  async registration(req: Request, res: Response) {
    try {
      const role: UserRole = req.route.path.split('/')[1];
      const strategy = new RegistrationStrategy(
        new StudentRegistration(req.body as IRegistrationStudentProps)
      );

      if (role === 'student') {
        strategy.setStrategy(
          new StudentRegistration(req.body as IRegistrationStudentProps)
        );
        strategy.successMessage = userCreateSuccessfull('student');
      }
      if (role === 'teacher') {
        strategy.setStrategy(
          new TeacherRegistration(req.body as ITeacherRegistrationProps)
        );
        strategy.successMessage = userCreateSuccessfull('teacher');
      }
      if (role === 'company') {
        strategy.setStrategy(
          new CompanyRegistration(req.body as ICompanyRegistrationProps)
        );
        strategy.successMessage = userCreateSuccessfull('company');
      }

      if (!strategy) {
        return res.status(status.BAD_REQUEST).json({
          message: 'Error',
        });
      }

      const response = await strategy.registration();

      return res.status(status.SUCCESS).json({
        message: response.message,
      });
    } catch (e) {
      if (!(e instanceof Error)) return;
      return res.status(status.BAD_REQUEST).json({
        message: e.message,
      });
    }
  }
}

export default new RegistrationController();
