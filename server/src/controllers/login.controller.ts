import { Request, Response } from 'express';
import LoginService, { ILoginProps } from '../services/login.service';
import tokenService from '../services/token.service';
import status from '../constants/status';
import responseMessages from '../constants/responseMessages';

class LoginController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.query;
      if (typeof email !== 'string' || typeof password !== 'string') {
        return res.status(status.SUCCESS).json({
          message: 'Error',
        });
      }

      const response = await LoginService.login({ email, password });
      if (response) {
        res.cookie('token', response.token, {
          domain: process.env.DOMAIN,
          path: '/',
          secure: false,
        });
        res.cookie('userId', response.userId.toString(), {
          domain: process.env.DOMAIN,
          path: '/',
          secure: false,
        });
        res.cookie('role', response.role, {
          domain: process.env.DOMAIN,
          path: '/',
          secure: false,
        });
      }
      return res.status(status.SUCCESS).json(response);
    } catch (e) {
      if (!(e instanceof Error)) return;
      return res.status(status.BAD_REQUEST).json({
        error: e.message,
      });
    }
  }

  async isAuth(req: Request, res: Response) {
    try {
      const token = req.headers.authorization;
      const userData = await tokenService.validateAccessToken(token);

      if (!userData) {
        return res
          .status(status.UNAUTHORIZED)
          .json({ message: responseMessages.destroyedToken });
      }

      return res.status(status.SUCCESS).json({ isAuth: true });
    } catch (err) {
      return res
        .status(status.UNAUTHORIZED)
        .json({ message: responseMessages.unauthorized, isAuth: false });
    }
  }
}

export default new LoginController();
