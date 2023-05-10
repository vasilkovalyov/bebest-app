import { Request, Response } from 'express';
import LoginService from '../services/login.service';
import tokenService from '../services/token.service';

class LoginController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.query;
      if (typeof email !== 'string' || typeof password !== 'string') {
        return res.status(200).json({
          message: 'Error',
        });
      }

      const response = await LoginService.login(email, password);
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
      return res.status(200).json(response);
    } catch (e) {
      if (!(e instanceof Error)) return;
      return res.status(400).json({
        error: e.message,
      });
    }
  }

  async isAuth(req: Request, res: Response) {
    try {
      const token = req.headers.authorization;
      const userData = await tokenService.validateAccessToken(token);

      if (!userData) {
        return res.status(401).json({ message: 'Token has been destroyed!' });
      }

      return res.status(200).json({ isAuth: true });
    } catch (err) {
      return res.status(401).json({ message: 'User is not authorized!' });
    }
  }
}

export default new LoginController();
