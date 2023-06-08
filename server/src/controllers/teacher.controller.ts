import { File } from 'buffer';
import { Request, Response } from 'express';
import teacherService from '../services/teacher.service';
import tokenService from '../services/token.service';
import teacherPaymentCardService from '../services/teacher-payment-card';
import { ITokenData } from 'interfaces/token';

class TeacherController {
  async removeUser(req: Request, res: Response) {
    try {
      const userData = (await tokenService.validateAccessToken(
        req.headers.authorization
      )) as ITokenData;

      const response = await teacherService.removeUser(userData._id);
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
      const response = await teacherService.changePassword(
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

      const response = await teacherService.getUserInfo(userData._id);

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

      const response = await teacherService.uploadUserAvatar(
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

  async updateUserInfo(
    req: Request & { files?: { video: File } },
    res: Response
  ) {
    try {
      const userData = (await tokenService.validateAccessToken(
        req.headers.authorization
      )) as ITokenData;

      const response = await teacherService.updateUserInfo(userData._id, {
        ...req.body,
        video: req.files?.video || null,
      });

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
      const response = await teacherService.addMainFieldsActivity(
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

      const response = await teacherService.removeMainFieldsActivity(
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
      const response = await teacherService.updatePersonalLessons(
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
      const response = await teacherService.addWorkExperience(
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

      const response = await teacherService.removeWorkExperience(
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
      const response = await teacherService.getPersonalnfo(userData._id);
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

  async uploadCertificate(
    req: Request & { files?: { file: File } },
    res: Response
  ) {
    try {
      const userData = (await tokenService.validateAccessToken(
        req.headers.authorization
      )) as ITokenData;
      const response = await teacherService.uploadCertificate(
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

  async removeCertificate(req: Request, res: Response) {
    try {
      const userData = (await tokenService.validateAccessToken(
        req.headers.authorization
      )) as ITokenData;

      const { id } = req.params;

      const response = await teacherService.removeCertificate(userData._id, id);
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
