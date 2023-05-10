import { Request, Response } from 'express';
import StudentService from '../services/student.service';
import ApiError from '../utils/api-error';

class StudentController {
  async removeUser(req: Request, res: Response) {
    try {
      const { userId } = req.body;
      if (!userId) {
        throw ApiError.BadRequestError('You have to add send userId');
      }
      const response = await StudentService.removeUser(userId);
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
      const response = await StudentService.changePassword(userId, password);
      return res.status(200).json(response);
    } catch (e) {
      if (!(e instanceof Error)) return;
      return res.status(400).json({
        data: e.message,
      });
    }
  }

  async getUserInfo(req: Request, res: Response) {
    try {
      const { id } = req.query;
      if (!id) {
        throw ApiError.BadRequestError('You did not send user id');
      }

      const response = await StudentService.getUserInfo(id.toString());

      return res.status(200).json(response);
    } catch (e) {
      if (!(e instanceof Error)) return;
      return res.status(400).json({
        message: e.message,
      });
    }
  }
}

export default new StudentController();
