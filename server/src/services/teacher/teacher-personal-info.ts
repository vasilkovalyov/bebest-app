import ApiError from '../../utils/api-error';

import TeacherPersonalInfoModel, {
  ITeacherCostPersonalLesson,
  ITeacherMainFieldsActivityRequest,
  ITeacherWorkExperience,
  ITeacherCertificate,
  TeacherPersonalInfoModelType,
  ITeacherPersonalInfoModel,
  ITeacherMainFieldsActivity,
} from '../../models/teacher/teacher-personal-info';
import TeacherProgressAccountModel from '../../models/teacher/teacher-progress-account';

import { SubjectsModel } from '../../models/subject.model';

import teacherProgressAccountService from './teacher-progress-account';
import { uploadCertificate } from '../../utils/upload-file';
import responseMessages, {
  userWithIdNotFound,
} from '../../constants/responseMessages';
import responseTeacherMessages from '../../constants/responseTeacherMessages';
import teacherService from './teacher.service';

class TeacherPersonalInfoService {
  async createMainFieldActivity(
    id: string,
    props: ITeacherMainFieldsActivityRequest
  ) {
    const { subject, categories } = props;

    const subjects = await SubjectsModel.findOne({
      _id: subject,
    });

    const response = await TeacherPersonalInfoModel.findOneAndUpdate(
      { teacherId: id },
      {
        $push: {
          fields_activity: {
            subject: subjects?._id,
            categories: categories,
          },
        },
      },
      { new: true }
    ).select('fields_activity');

    if (response && response.fields_activity.length === 1) {
      await teacherProgressAccountService.addMainActivity(id);
    }

    return {
      message: responseTeacherMessages.mainActivityAddSuccessful,
    };
  }

  async deleteMainFieldActivity(id: string, subjectId: string) {
    const response = await TeacherPersonalInfoModel.findOneAndUpdate(
      {
        teacherId: id,
      },
      { $pull: { fields_activity: { subject: subjectId } } },
      { new: true }
    );

    if (response && response.fields_activity.length === 0) {
      await teacherProgressAccountService.removeMainActivity(id);
    }
    return {
      message: responseTeacherMessages.mainActivityRemoveSuccessful,
    };
  }

  async updatePersonalLessons(id: string, props: ITeacherCostPersonalLesson) {
    const response = await TeacherPersonalInfoModel.findOne({ teacherId: id });
    if (response) {
      await TeacherPersonalInfoModel.findOneAndUpdate(
        { teacherId: id },
        {
          personal_lessons: {
            ...props,
          },
        },
        { new: true }
      );
    } else {
      const teacherPersonalInfoResponse = await new TeacherPersonalInfoModel({
        teacherId: id,
        personal_lessons: props,
      });
      await teacherPersonalInfoResponse.save();
    }

    await teacherProgressAccountService.updatePriceLessons(id, props);
    await teacherService.activateUser(id);

    return {
      message: responseTeacherMessages.personalLessonsUpdateSuccessful,
    };
  }

  async createWorkExperience(id: string, props: ITeacherWorkExperience) {
    const response = await TeacherPersonalInfoModel.findOneAndUpdate(
      { teacherId: id },
      { $push: { work_experience: props } },
      { new: true }
    ).select('work_experience');

    if (response && response.work_experience.length === 1) {
      await teacherProgressAccountService.addWorkExperience(id);
    }

    await teacherService.activateUser(id);

    return {
      message: responseTeacherMessages.workExperienceAddSuccessful,
    };
  }

  async deleteWorkExperience(id: string, workExperienceId: string) {
    const response = await TeacherPersonalInfoModel.findOneAndUpdate(
      { teacherId: id },
      { $pull: { work_experience: { _id: workExperienceId } } },
      { new: true }
    ).select('work_experience');

    if (response && response.work_experience.length === 0) {
      await teacherProgressAccountService.removeWorkExperience(id);
    }

    await teacherService.activateUser(id);

    return {
      message: responseTeacherMessages.workExperienceRemoveSuccessful,
    };
  }

  async getPersonalnfo(id: string) {
    const response = await TeacherPersonalInfoModel.findOne({
      teacherId: id,
    }).select(
      '_id teacherId fields_activity personal_lessons work_experience certificates'
    );

    if (!response) {
      throw ApiError.BadRequestError(userWithIdNotFound('teacher', id));
    }

    const personalInfo = await TeacherPersonalInfoModel.findOne({
      teacherId: id,
    })

      .populate([
        {
          path: 'fields_activity.subject',
          select: 'subject',
        },
        {
          path: 'fields_activity.categories',
          select: '_id category',
        },
      ])
      .lean()
      .exec()
      .then((posts) => {
        const postsArr = posts?.fields_activity.map<ITeacherMainFieldsActivity>(
          (post) => {
            const props: ITeacherMainFieldsActivity = {
              _id: post.subject._id,
              subject: post.subject.subject,
              categories: post.categories,
            };
            return props;
          }
        );
        return {
          ...posts,
          fields_activity: postsArr,
        };
      });

    return {
      _id: response._id,
      fields_activity: personalInfo?.fields_activity,
      personal_lessons: response.personal_lessons,
      work_experience: response.work_experience,
      certificates: response.certificates,
    };
  }

  async createCertificate(id: string, props: ITeacherCertificate) {
    let imageUrl = '';
    if (props.image) {
      const res = await uploadCertificate(props.image);
      imageUrl = res.secure_url;
    }

    const response = await TeacherPersonalInfoModel.findOne({ teacherId: id });

    if (!response)
      throw ApiError.BadRequestError(responseMessages.certificateDidNotUpload);

    await TeacherPersonalInfoModel.findOneAndUpdate(
      { teacherId: id },
      { $push: { certificates: { ...props, image: imageUrl } } },
      { new: true }
    );

    const progressData = await TeacherProgressAccountModel.findOne({
      teacherId: id,
    });

    if (!response) return;

    if (progressData && progressData.certificate.value === 0) {
      await teacherProgressAccountService.addCertificate(id);
    }

    await teacherService.activateUser(id);

    return {
      message: responseMessages.certificateUploadSuccessful,
    };
  }

  async deleteCertificate(id: string, certificateId: string) {
    const response = await TeacherPersonalInfoModel.findOneAndUpdate(
      { teacherId: id },
      { $pull: { certificates: { _id: certificateId } } },
      { new: true }
    );

    if (response && response.certificates.length === 0) {
      await teacherProgressAccountService.removeCertificate(id);
    }

    return {
      message: responseMessages.certificateRemoveSuccessful,
    };
  }
}

export default new TeacherPersonalInfoService();
