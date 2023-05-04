import { Request, Response } from 'express';
import UserService from '../services/student.service';

class StudentController {
  async addUser(req: Request, res: Response) {
    try {
      const response = await UserService.addUser();
      return res.status(200).json({
        data: response,
      });
    } catch (e: any) {
      return res.status(400).json({
        data: e.message,
      });
    }
  }
}

export default new StudentController();
