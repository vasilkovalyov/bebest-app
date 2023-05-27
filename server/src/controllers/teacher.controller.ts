import { Request, Response } from 'express';
import TeacherService from '../services/teacher.service';
import tokenService from '../services/token.service';
import { ITokenData } from 'interfaces/token';

class TeacherController {
  async removeUser(req: Request, res: Response) {
    try {
      const userData = (await tokenService.validateAccessToken(
        req.headers.authorization
      )) as ITokenData;

      const response = await TeacherService.removeUser(userData._id);
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
      const response = await TeacherService.changePassword(
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

      const response = await TeacherService.getUserInfo(userData._id);

      return res.status(200).json(response);
    } catch (e) {
      if (!(e instanceof Error)) return;
      return res.status(400).json({
        message: e.message,
        isAuth: false,
      });
    }
  }

  async updateUserInfo(req: Request, res: Response) {
    try {
      const userData = (await tokenService.validateAccessToken(
        req.headers.authorization
      )) as ITokenData;
      const response = await TeacherService.updateUserInfo(
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
}

export default new TeacherController();
