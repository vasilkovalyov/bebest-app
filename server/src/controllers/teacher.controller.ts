import { Request, Response } from 'express';
import TeacherService from '../services/teacher.service';
import tokenService from '../services/token.service';
import teacherPaymentCardService from '../services/teacher-payment-card';
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

  async addMainFieldsActivity(req: Request, res: Response) {
    try {
      const userData = (await tokenService.validateAccessToken(
        req.headers.authorization
      )) as ITokenData;
      const response = await TeacherService.addMainFieldsActivity(
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

  async removeMainFieldsActivity(req: Request, res: Response) {
    try {
      const userData = (await tokenService.validateAccessToken(
        req.headers.authorization
      )) as ITokenData;
      const { id } = req.params;

      const response = await TeacherService.removeMainFieldsActivity(
        userData._id,
        id
      );
      return res.status(200).json(response);
    } catch (e) {
      if (!(e instanceof Error)) return;
      return res.status(400).json({
        message: e.message,
      });
    }
  }

  async updatePersonalLessons(req: Request, res: Response) {
    try {
      const userData = (await tokenService.validateAccessToken(
        req.headers.authorization
      )) as ITokenData;
      const response = await TeacherService.updatePersonalLessons(
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

  async addWorkExperience(req: Request, res: Response) {
    try {
      const userData = (await tokenService.validateAccessToken(
        req.headers.authorization
      )) as ITokenData;
      const response = await TeacherService.addWorkExperience(
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

  async removeWorkExperience(req: Request, res: Response) {
    try {
      const userData = (await tokenService.validateAccessToken(
        req.headers.authorization
      )) as ITokenData;
      const { id } = req.params;

      const response = await TeacherService.removeWorkExperience(
        userData._id,
        id
      );
      return res.status(200).json(response);
    } catch (e) {
      if (!(e instanceof Error)) return;
      return res.status(400).json({
        message: e.message,
      });
    }
  }

  async getPersonalnfo(req: Request, res: Response) {
    try {
      const userData = (await tokenService.validateAccessToken(
        req.headers.authorization
      )) as ITokenData;
      const response = await TeacherService.getPersonalnfo(userData._id);
      return res.status(200).json(response);
    } catch (e) {
      if (!(e instanceof Error)) return;
      return res.status(400).json({
        message: e.message,
      });
    }
  }

  async addPaymentCard(req: Request, res: Response) {
    try {
      const userData = (await tokenService.validateAccessToken(
        req.headers.authorization
      )) as ITokenData;
      const response = await teacherPaymentCardService.addPaymentCard(
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
  async removePaymentCard(req: Request, res: Response) {
    try {
      const userData = (await tokenService.validateAccessToken(
        req.headers.authorization
      )) as ITokenData;
      const { id } = req.params;
      const response = await teacherPaymentCardService.removePaymentCard(
        userData._id
      );
      return res.status(200).json(response);
    } catch (e) {
      if (!(e instanceof Error)) return;
      return res.status(400).json({
        message: e.message,
      });
    }
  }

  async getPaymentCard(req: Request, res: Response) {
    try {
      const userData = (await tokenService.validateAccessToken(
        req.headers.authorization
      )) as ITokenData;

      const response = await teacherPaymentCardService.getPaymentCard(
        userData._id
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
