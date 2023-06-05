import { Request, Response } from 'express';
import StudentService from '../services/student.service';
import tokenService from '../services/token.service';
import { ITokenData } from 'interfaces/token';

class StudentController {
  async removeUser(req: Request, res: Response) {
    try {
      const userData = (await tokenService.validateAccessToken(
        req.headers.authorization
      )) as ITokenData;

      const response = await StudentService.removeUser(userData._id);
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
      const userData = (await tokenService.validateAccessToken(
        req.headers.authorization
      )) as ITokenData;

      const { password } = req.body;

      const response = await StudentService.changePassword(
        userData._id,
        password
      );
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
      const userData = (await tokenService.validateAccessToken(
        req.headers.authorization
      )) as ITokenData;

      const response = await StudentService.getUserInfo(userData._id);

      return res.status(200).json(response);
    } catch (e) {
      if (!(e instanceof Error)) return;
      return res.status(400).json({
        message: e.message,
        isAuth: false,
      });
    }
  }

  async uploadUserAvatar(req: Request, res: Response) {
    try {
      const userData = (await tokenService.validateAccessToken(
        req.headers.authorization
      )) as ITokenData;

      const response = await StudentService.uploadUserAvatar(
        userData._id,
        req.body.avatar
      );

      return res.status(200).json(response);
    } catch (e) {
      if (!(e instanceof Error)) return;
      return res.status(400).json({
        message: e.message,
      });
    }
  }

  async updateUserInfo(req: Request, res: Response) {
    try {
      const userData = (await tokenService.validateAccessToken(
        req.headers.authorization
      )) as ITokenData;

      const response = await StudentService.updateUserInfo(
        userData._id,
        req.body
      );

      return res.status(200).json(response);
    } catch (e) {
      if (!(e instanceof Error)) return;
      return res.status(400).json({
        message: e.message,
      });
    }
  }

  async addSubject(req: Request, res: Response) {
    try {
      const userData = (await tokenService.validateAccessToken(
        req.headers.authorization
      )) as ITokenData;

      const { subject_study, level_mastery_subject } = req.body;

      const response = await StudentService.addSubjects(userData._id, {
        subject_study,
        level_mastery_subject,
      });

      return res.status(200).json(response);
    } catch (e) {
      if (!(e instanceof Error)) return;
      return res.status(400).json({
        message: e.message,
        isAuth: false,
      });
    }
  }

  async removeSubject(req: Request, res: Response) {
    try {
      const userData = (await tokenService.validateAccessToken(
        req.headers.authorization
      )) as ITokenData;

      const { id } = req.params;

      const response = await StudentService.removeSubject(userData._id, id);

      return res.status(200).json(response);
    } catch (e) {
      if (!(e instanceof Error)) return;
      return res.status(400).json({
        message: e.message,
        isAuth: false,
      });
    }
  }

  async getSubject(req: Request, res: Response) {
    try {
      const userData = (await tokenService.validateAccessToken(
        req.headers.authorization
      )) as ITokenData;

      const response = await StudentService.getSubjects(userData._id);

      return res.status(200).json(response);
    } catch (e) {
      if (!(e instanceof Error)) return;
      return res.status(400).json({
        message: e.message,
        isAuth: false,
      });
    }
  }
}

export default new StudentController();
