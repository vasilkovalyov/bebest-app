import { Request, Response } from 'express';
import subjectsService from '../services/subject.service';
import status from '../constants/status';

class SubjectController {
  async addSubjects(req: Request, res: Response) {
    try {
      const { subjects } = req.body;

      const response = await subjectsService.addSubjects(subjects);
      return res.status(status.SUCCESS).json(response);
    } catch (e) {
      if (!(e instanceof Error)) return;
      return res.status(status.BAD_REQUEST).json({
        message: e.message,
      });
    }
  }

  async addSubjectsCategories(req: Request, res: Response) {
    try {
      const { subjectId, subjects_categories } = req.body;

      const response = await subjectsService.addSubjectsCategories(
        subjectId,
        subjects_categories
      );
      return res.status(status.SUCCESS).json(response);
    } catch (e) {
      if (!(e instanceof Error)) return;
      return res.status(status.BAD_REQUEST).json({
        message: e.message,
      });
    }
  }

  async getSubjects(req: Request, res: Response) {
    try {
      const response = await subjectsService.getSubjects();
      return res.status(status.SUCCESS).json(response);
    } catch (e) {
      if (!(e instanceof Error)) return;
      return res.status(status.BAD_REQUEST).json({
        message: e.message,
      });
    }
  }
}

export default new SubjectController();
