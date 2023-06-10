import { Response } from 'express';
import StudentService from '../services/student/student.service';
import { RequestWithAuthUser } from '../interfaces/token';
import status from '../constants/status';
import responseStudentMessages from '../constants/responseStudentMessages';

class StudentController {
  async removeUser(req: RequestWithAuthUser, res: Response) {
    if (!req.user)
      return res
        .status(status.NOT_FOUND)
        .json(responseStudentMessages.notUserByToken);
    try {
      const response = await StudentService.removeUser(req.user?._id);
      return res.status(status.SUCCESS).json({
        data: response,
      });
    } catch (e) {
      if (!(e instanceof Error)) return;
      return res.status(status.BAD_REQUEST).json({
        data: e.message,
      });
    }
  }

  async changePassword(req: RequestWithAuthUser, res: Response) {
    if (!req.user)
      return res
        .status(status.NOT_FOUND)
        .json(responseStudentMessages.notUserByToken);
    try {
      const { password } = req.body;

      const response = await StudentService.changePassword(
        req.user?._id,
        password
      );
      return res.status(status.SUCCESS).json(response);
    } catch (e) {
      if (!(e instanceof Error)) return;
      return res.status(status.BAD_REQUEST).json({
        data: e.message,
      });
    }
  }

  async getUserInfo(req: RequestWithAuthUser, res: Response) {
    if (!req.user)
      return res
        .status(status.NOT_FOUND)
        .json(responseStudentMessages.notUserByToken);
    try {
      const response = await StudentService.getUserInfo(req.user._id);

      return res.status(status.SUCCESS).json(response);
    } catch (e) {
      if (!(e instanceof Error)) return;
      return res.status(status.BAD_REQUEST).json({
        message: e.message,
        isAuth: false,
      });
    }
  }

  async uploadUserAvatar(req: RequestWithAuthUser, res: Response) {
    if (!req.user)
      return res
        .status(status.NOT_FOUND)
        .json(responseStudentMessages.notUserByToken);

    try {
      const response = await StudentService.uploadUserAvatar(
        req.user._id,
        req.body.avatar
      );

      return res.status(status.SUCCESS).json(response);
    } catch (e) {
      if (!(e instanceof Error)) return;
      return res.status(status.BAD_REQUEST).json({
        message: e.message,
      });
    }
  }

  async updateUserInfo(req: RequestWithAuthUser, res: Response) {
    if (!req.user)
      return res
        .status(status.NOT_FOUND)
        .json(responseStudentMessages.notUserByToken);

    try {
      const response = await StudentService.updateUserInfo(
        req.user._id,
        req.body
      );

      return res.status(status.SUCCESS).json(response);
    } catch (e) {
      if (!(e instanceof Error)) return;
      return res.status(status.BAD_REQUEST).json({
        message: e.message,
      });
    }
  }

  async addSubject(req: RequestWithAuthUser, res: Response) {
    if (!req.user)
      return res
        .status(status.NOT_FOUND)
        .json(responseStudentMessages.notUserByToken);

    try {
      const { subject_study, level_mastery_subject } = req.body;

      const response = await StudentService.addSubjects(req.user._id, {
        subject_study,
        level_mastery_subject,
      });

      return res.status(status.SUCCESS).json(response);
    } catch (e) {
      if (!(e instanceof Error)) return;
      return res.status(status.BAD_REQUEST).json({
        message: e.message,
        isAuth: false,
      });
    }
  }

  async removeSubject(req: RequestWithAuthUser, res: Response) {
    if (!req.user)
      return res
        .status(status.NOT_FOUND)
        .json(responseStudentMessages.notUserByToken);

    try {
      const { id } = req.params;

      const response = await StudentService.removeSubject(req.user._id, id);

      return res.status(status.SUCCESS).json(response);
    } catch (e) {
      if (!(e instanceof Error)) return;
      return res.status(status.BAD_REQUEST).json({
        message: e.message,
        isAuth: false,
      });
    }
  }

  async getSubject(req: RequestWithAuthUser, res: Response) {
    if (!req.user)
      return res
        .status(status.NOT_FOUND)
        .json(responseStudentMessages.notUserByToken);

    try {
      const response = await StudentService.getSubjects(req.user._id);

      return res.status(status.SUCCESS).json(response);
    } catch (e) {
      if (!(e instanceof Error)) return;
      return res.status(status.BAD_REQUEST).json({
        message: e.message,
        isAuth: false,
      });
    }
  }
}

export default new StudentController();
