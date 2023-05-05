import { Request, Response } from 'express';
import UserService from '../services/student.service';
import ApiError from '../utils/api-error';

class StudentController {
  async removeUser(req: Request, res: Response) {
    try {
      const { userId } = req.body;
      if (!userId) {
        throw ApiError.BadRequestError('You have to add send userId');
      }
      const response = await UserService.removeUser(userId);
      return res.status(200).json({
        data: response,
      });
    } catch (e) {
      if (!(e instanceof Error)) return;
      return res.status(400).json({
        data: e.message,
      });
    }
  }

  async changePassword(req: Request, res: Response) {
    try {
      const { userId, password } = req.body;
      const response = await UserService.changePassword(userId, password);
      return res.status(200).json(response);
    } catch (e) {
      if (!(e instanceof Error)) return;
      return res.status(400).json({
        data: e.message,
      });
    }
  }
}

export default new StudentController();
