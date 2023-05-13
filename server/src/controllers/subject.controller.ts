import { Request, Response } from 'express';
import SubjectsService from '../services/subject.service';

class SubjectController {
  async addSubjects(req: Request, res: Response) {
    try {
      const { subjects } = req.body;
      const response = await SubjectsService.addSubjects(subjects);
      return res.status(200).json(response);
    } catch (e) {
      if (!(e instanceof Error)) return;
      return res.status(400).json({
        message: e.message,
      });
    }
  }

  async getSubjects(req: Request, res: Response) {
    try {
      const response = await SubjectsService.getSubjects();
      return res.status(200).json(response);
    } catch (e) {
      if (!(e instanceof Error)) return;
      return res.status(400).json({
        message: e.message,
      });
    }
  }
}

export default new SubjectController();
