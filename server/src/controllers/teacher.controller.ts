import { File } from 'buffer';
import { Request, Response } from 'express';
import teacherService from '../services/teacher/teacher.service';
import teacherLessonService from '../services/teacher/teacher-lesson';
import teacherLessonModuleService from '../services/teacher/teacher-lesson-module';
import teacherPersonalInfoService from '../services/teacher/teacher-personal-info';
import teacherPaymentCardService from '../services/teacher/teacher-payment-card';
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
      const response = await teacherPersonalInfoService.addMainFieldsActivity(
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

      const response =
        await teacherPersonalInfoService.removeMainFieldsActivity(
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
      const response = await teacherPersonalInfoService.updatePersonalLessons(
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
      const response = await teacherPersonalInfoService.addWorkExperience(
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

      const response = await teacherPersonalInfoService.removeWorkExperience(
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
      const response = await teacherPersonalInfoService.getPersonalnfo(
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
      const response = await teacherPersonalInfoService.uploadCertificate(
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

      const response = await teacherPersonalInfoService.removeCertificate(
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

  async getUsers(req: Request, res: Response) {
    try {
      const response = await teacherService.getUsers();
      return res.status(status.SUCCESS).json(response);
    } catch (e) {
      if (!(e instanceof Error)) return;
      return res.status(status.BAD_REQUEST).json({
        message: e.message,
      });
    }
  }

  async getTeacherProfile(req: Request, res: Response) {
    try {
      const response = await teacherService.getUserProfile(req.params.id);
      return res.status(status.SUCCESS).json(response);
    } catch (e) {
      if (!(e instanceof Error)) return;
      return res.status(status.BAD_REQUEST).json({
        message: e.message,
      });
    }
  }

  async createLesson(req: RequestWithAuthUser, res: Response) {
    if (!req.user)
      return res
        .status(status.NOT_FOUND)
        .json(responseTeacherMessages.notUserByToken);

    try {
      const response = await teacherLessonService.createLesson(
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

  async updateLesson(req: RequestWithAuthUser, res: Response) {
    if (!req.user)
      return res
        .status(status.NOT_FOUND)
        .json(responseTeacherMessages.notUserByToken);

    try {
      const { _id, ...props } = req.body;
      const response = await teacherLessonService.updateLesson(_id, props);
      return res.status(status.SUCCESS).json(response);
    } catch (e) {
      if (!(e instanceof Error)) return;
      return res.status(status.BAD_REQUEST).json({
        message: e.message,
      });
    }
  }

  async deleteLesson(req: RequestWithAuthUser, res: Response) {
    if (!req.user)
      return res
        .status(status.NOT_FOUND)
        .json(responseTeacherMessages.notUserByToken);

    try {
      const response = await teacherLessonService.deleteLesson(
        req.user._id,
        req.params.id
      );
      return res.status(status.SUCCESS).json(response);
    } catch (e) {
      if (!(e instanceof Error)) return;
      return res.status(status.BAD_REQUEST).json({
        message: e.message,
      });
    }
  }

  async getLesson(req: RequestWithAuthUser, res: Response) {
    if (!req.user)
      return res
        .status(status.NOT_FOUND)
        .json(responseTeacherMessages.notUserByToken);

    try {
      const response = await teacherLessonService.getLesson(req.params.id);
      return res.status(status.SUCCESS).json(response);
    } catch (e) {
      if (!(e instanceof Error)) return;
      return res.status(status.BAD_REQUEST).json({
        message: e.message,
      });
    }
  }

  async getUserLessons(req: RequestWithAuthUser, res: Response) {
    if (!req.user)
      return res
        .status(status.NOT_FOUND)
        .json(responseTeacherMessages.notUserByToken);

    try {
      const response = await teacherLessonService.getUserLessons(req.user._id);
      return res.status(status.SUCCESS).json(response);
    } catch (e) {
      if (!(e instanceof Error)) return;
      return res.status(status.BAD_REQUEST).json({
        message: e.message,
      });
    }
  }

  async createLessonModule(req: RequestWithAuthUser, res: Response) {
    if (!req.user)
      return res
        .status(status.NOT_FOUND)
        .json(responseTeacherMessages.notUserByToken);

    try {
      const { lessonId, ...props } = req.body;
      const response = await teacherLessonModuleService.createLessonModule(
        lessonId,
        props
      );
      return res.status(status.SUCCESS).json(response);
    } catch (e) {
      if (!(e instanceof Error)) return;
      return res.status(status.BAD_REQUEST).json({
        message: e.message,
      });
    }
  }

  async updateLessonModule(req: RequestWithAuthUser, res: Response) {
    if (!req.user)
      return res
        .status(status.NOT_FOUND)
        .json(responseTeacherMessages.notUserByToken);

    try {
      const response = await teacherLessonModuleService.updateLessonModule(
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

  async deleteLessonModule(req: RequestWithAuthUser, res: Response) {
    if (!req.user)
      return res
        .status(status.NOT_FOUND)
        .json(responseTeacherMessages.notUserByToken);

    try {
      const { lessonId, lessonModuleId } = req.body;
      const response = await teacherLessonModuleService.deleteLessonModule(
        lessonId,
        lessonModuleId
      );
      return res.status(status.SUCCESS).json(response);
    } catch (e) {
      if (!(e instanceof Error)) return;
      return res.status(status.BAD_REQUEST).json({
        message: e.message,
      });
    }
  }

  async getLessonModule(req: RequestWithAuthUser, res: Response) {
    if (!req.user)
      return res
        .status(status.NOT_FOUND)
        .json(responseTeacherMessages.notUserByToken);

    try {
      const moduleId = req.params.id as string;
      const response = await teacherLessonModuleService.getLessonModule(
        moduleId
      );
      return res.status(status.SUCCESS).json(response);
    } catch (e) {
      if (!(e instanceof Error)) return;
      return res.status(status.BAD_REQUEST).json({
        message: e.message,
      });
    }
  }

  async getModulesLesson(req: RequestWithAuthUser, res: Response) {
    if (!req.user)
      return res
        .status(status.NOT_FOUND)
        .json(responseTeacherMessages.notUserByToken);

    try {
      const lessonId = req.params.id as string;
      const response = await teacherLessonModuleService.getModulesLesson(
        lessonId
      );
      return res.status(status.SUCCESS).json(response);
    } catch (e) {
      if (!(e instanceof Error)) return;
      return res.status(status.BAD_REQUEST).json({
        message: e.message,
      });
    }
  }

  async addStudentToLesson(req: RequestWithAuthUser, res: Response) {
    if (!req.user)
      return res
        .status(status.NOT_FOUND)
        .json(responseTeacherMessages.notUserByToken);

    try {
      const { lessonId, studentId } = req.body;
      const response = await teacherLessonService.addStudentToLesson(
        lessonId,
        studentId
      );

      return res.status(status.SUCCESS).json(response);
    } catch (e) {
      if (!(e instanceof Error)) return;
      return res.status(status.BAD_REQUEST).json({
        message: e.message,
        isAuth: false,
      });
    }
  }

  async deleteStudentFromLesson(req: RequestWithAuthUser, res: Response) {
    if (!req.user)
      return res
        .status(status.NOT_FOUND)
        .json(responseTeacherMessages.notUserByToken);

    try {
      const { lessonId, studentId } = req.body;
      const response = await teacherLessonService.deleteStudentFromLesson(
        lessonId,
        studentId
      );

      return res.status(status.SUCCESS).json(response);
    } catch (e) {
      if (!(e instanceof Error)) return;
      return res.status(status.BAD_REQUEST).json({
        message: e.message,
        isAuth: false,
      });
    }
  }

  async getStudentsFromLesson(req: RequestWithAuthUser, res: Response) {
    if (!req.user)
      return res
        .status(status.NOT_FOUND)
        .json(responseTeacherMessages.notUserByToken);

    try {
      const { lessonId } = req.body;
      const response = await teacherLessonService.getStudentsFromLesson(
        lessonId
      );

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

export default new TeacherController();
