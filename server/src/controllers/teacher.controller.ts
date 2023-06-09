import { File } from 'buffer';
import { Response } from 'express';
import teacherService from '../services/teacher.service';
import teacherPaymentCardService from '../services/teacher-payment-card';
import { RequestWithAuthUser } from '../interfaces/token';
import status from '../constants/status';
import responseTeacherMessages from '../constants/responseTeacherMessages';

class TeacherController {
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

  async addMainFieldsActivity(req: RequestWithAuthUser, res: Response) {
    if (!req.user)
      return res
        .status(status.NOT_FOUND)
        .json(responseTeacherMessages.notUserByToken);

    try {
      const response = await teacherService.addMainFieldsActivity(
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

  async removeMainFieldsActivity(req: RequestWithAuthUser, res: Response) {
    if (!req.user)
      return res
        .status(status.NOT_FOUND)
        .json(responseTeacherMessages.notUserByToken);

    try {
      const { id } = req.params;

      const response = await teacherService.removeMainFieldsActivity(
        req.user._id,
        id
      );
      return res.status(status.SUCCESS).json(response);
    } catch (e) {
      if (!(e instanceof Error)) return;
      return res.status(status.BAD_REQUEST).json({
        message: e.message,
      });
    }
  }

  async updatePersonalLessons(req: RequestWithAuthUser, res: Response) {
    if (!req.user)
      return res
        .status(status.NOT_FOUND)
        .json(responseTeacherMessages.notUserByToken);

    try {
      const response = await teacherService.updatePersonalLessons(
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

  async addWorkExperience(req: RequestWithAuthUser, res: Response) {
    if (!req.user)
      return res
        .status(status.NOT_FOUND)
        .json(responseTeacherMessages.notUserByToken);

    try {
      const response = await teacherService.addWorkExperience(
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

  async removeWorkExperience(req: RequestWithAuthUser, res: Response) {
    if (!req.user)
      return res
        .status(status.NOT_FOUND)
        .json(responseTeacherMessages.notUserByToken);

    try {
      const { id } = req.params;

      const response = await teacherService.removeWorkExperience(
        req.user._id,
        id
      );
      return res.status(status.SUCCESS).json(response);
    } catch (e) {
      if (!(e instanceof Error)) return;
      return res.status(status.BAD_REQUEST).json({
        message: e.message,
      });
    }
  }

  async getPersonalnfo(req: RequestWithAuthUser, res: Response) {
    if (!req.user)
      return res
        .status(status.NOT_FOUND)
        .json(responseTeacherMessages.notUserByToken);

    try {
      const response = await teacherService.getPersonalnfo(req.user._id);
      return res.status(status.SUCCESS).json(response);
    } catch (e) {
      if (!(e instanceof Error)) return;
      return res.status(status.BAD_REQUEST).json({
        message: e.message,
      });
    }
  }

  async addPaymentCard(req: RequestWithAuthUser, res: Response) {
    if (!req.user)
      return res
        .status(status.NOT_FOUND)
        .json(responseTeacherMessages.notUserByToken);

    try {
      const response = await teacherPaymentCardService.addPaymentCard(
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
  async removePaymentCard(req: RequestWithAuthUser, res: Response) {
    if (!req.user)
      return res
        .status(status.NOT_FOUND)
        .json(responseTeacherMessages.notUserByToken);

    try {
      const response = await teacherPaymentCardService.removePaymentCard(
        req.user._id
      );
      return res.status(status.SUCCESS).json(response);
    } catch (e) {
      if (!(e instanceof Error)) return;
      return res.status(status.BAD_REQUEST).json({
        message: e.message,
      });
    }
  }

  async getPaymentCard(req: RequestWithAuthUser, res: Response) {
    if (!req.user)
      return res
        .status(status.NOT_FOUND)
        .json(responseTeacherMessages.notUserByToken);

    try {
      const response = await teacherPaymentCardService.getPaymentCard(
        req.user._id
      );
      return res.status(status.SUCCESS).json(response);
    } catch (e) {
      if (!(e instanceof Error)) return;
      return res.status(status.BAD_REQUEST).json({
        message: e.message,
      });
    }
  }

  async uploadCertificate(
    req: RequestWithAuthUser & { files?: { file: File } },
    res: Response
  ) {
    if (!req.user)
      return res
        .status(status.NOT_FOUND)
        .json(responseTeacherMessages.notUserByToken);

    try {
      const response = await teacherService.uploadCertificate(
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

  async removeCertificate(req: RequestWithAuthUser, res: Response) {
    if (!req.user)
      return res
        .status(status.NOT_FOUND)
        .json(responseTeacherMessages.notUserByToken);

    try {
      const { id } = req.params;

      const response = await teacherService.removeCertificate(req.user._id, id);
      return res.status(status.SUCCESS).json(response);
    } catch (e) {
      if (!(e instanceof Error)) return;
      return res.status(status.BAD_REQUEST).json({
        message: e.message,
      });
    }
  }
}

export default new TeacherController();
