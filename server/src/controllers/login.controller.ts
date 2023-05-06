import { Request, Response } from 'express';
import LoginService from '../services/login.service';

class LoginController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.query;
      if (typeof email !== 'string' || typeof password !== 'string') {
        return res.status(200).json({
          data: 'Error',
        });
      }
      const response = await LoginService.login(email, password);
      if (response) {
        res.set('Authorization', `Bearer ${response.token}`);
        res.cookie('token', response.token, {
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
      return res.status(200).json({
        data: response,
      });
    } catch (e) {
      if (!(e instanceof Error)) return;
      return res.status(400).json({
        error: e.message,
      });
    }
  }
}

export default new LoginController();
