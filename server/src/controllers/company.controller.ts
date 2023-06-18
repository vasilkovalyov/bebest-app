import { File } from 'buffer';
import { Response } from 'express';
import teacherService from '../services/teacher/teacher.service';
import teacherPaymentCardService from '../services/teacher/teacher-payment-card';
import { RequestWithAuthUser } from '../interfaces/token';
import status from '../constants/status';
import responseTeacherMessages from '../constants/responseTeacherMessages';

class CompanyController {
  async removeUser(req: RequestWithAuthUser, res: Response) {
    if (!req.user)
      return res
        .status(status.NOT_FOUND)
        .json(responseTeacherMessages.notUserByToken);

    try {
      const response = await teacherService.removeUser(req.user._id);
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
        .json(responseTeacherMessages.notUserByToken);

    try {
      const response = await teacherService.changePassword(
        req.user._id,
        req.body.password
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
        .json(responseTeacherMessages.notUserByToken);

    try {
      const response = await teacherService.getUserInfo(req.user._id);

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
        .json(responseTeacherMessages.notUserByToken);

    try {
      const response = await teacherService.uploadUserAvatar(
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

  async updateUserInfo(
    req: RequestWithAuthUser & { files?: { video: File } },
    res: Response
  ) {
    if (!req.user)
      return res
        .status(status.NOT_FOUND)
        .json(responseTeacherMessages.notUserByToken);

    try {
      const response = await teacherService.updateUserInfo(req.user._id, {
        ...req.body,
        video: req.files?.video || null,
      });

      return res.status(status.SUCCESS).json(response);
    } catch (e) {
      if (!(e instanceof Error)) return;
      return res.status(status.BAD_REQUEST).json({
        message: e.message,
      });
    }
  }
}

export default new CompanyController();
