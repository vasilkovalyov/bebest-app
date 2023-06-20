import ApiError from '../../utils/api-error';

import TeacherPersonalInfoModel, {
  ITeacherCostPersonalLesson,
  ITeacherMainFieldsActivityRequest,
  ITeacherWorkExperience,
  ITeacherCertificate,
} from '../../models/teacher/teacher-personal-info';
import TeacherProgressAccountModel from '../../models/teacher/teacher-progress-account';

import SubjectModel from '../../models/subject.model';

import teacherProgressAccountService from './teacher-progress-account';
import { uploadCertificate } from '../../utils/upload-file';
import responseMessages, {
  userWithIdNotFound,
} from '../../constants/responseMessages';
import responseTeacherMessages from '../../constants/responseTeacherMessages';

class TeacherPersonalInfoService {
  async addMainFieldsActivity(
    id: string,
    props: ITeacherMainFieldsActivityRequest
  ) {
    const { categoryId, skills } = props;

    const subjects = await SubjectModel.findOne({
      _id: categoryId,
    });

    const response = await TeacherPersonalInfoModel.findOneAndUpdate(
      { teacherId: id },
      {
        $push: {
          fields_activity: {
            categoryId: subjects?._id,
            skills: skills,
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

  async removeMainFieldsActivity(id: string, categoryId: string) {
    const response = await TeacherPersonalInfoModel.findOneAndUpdate(
      {
        teacherId: id,
      },
      { $pull: { fields_activity: { categoryId: categoryId } } },
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

    return {
      message: responseTeacherMessages.personalLessonsUpdateSuccessful,
    };
  }

  async addWorkExperience(id: string, props: ITeacherWorkExperience) {
    const response = await TeacherPersonalInfoModel.findOneAndUpdate(
      { teacherId: id },
      { $push: { work_experience: props } },
      { new: true }
    ).select('work_experience');

    if (response && response.work_experience.length === 1) {
      await teacherProgressAccountService.addWorkExperience(id);
    }

    return {
      message: responseTeacherMessages.workExperienceAddSuccessful,
    };
  }

  async removeWorkExperience(id: string, workExperienceId: string) {
    const response = await TeacherPersonalInfoModel.findOneAndUpdate(
      { teacherId: id },
      { $pull: { work_experience: { _id: workExperienceId } } },
      { new: true }
    ).select('work_experience');

    if (response && response.work_experience.length === 0) {
      await teacherProgressAccountService.removeWorkExperience(id);
    }

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

    // console.log('response', response);

    const activities = await TeacherPersonalInfoModel.find()
      .select('fields_activity')
      .populate('fields_activity.categoryId', 'children')
      .exec()
      .then((res) => {
        console.log('res', res[0].fields_activity);
        return res[0].fields_activity;
      });
    // .exec()
    // .then((res) => {
    //   console.log('res', res);
    //   return res;
    // });

    // .populate('_id', 'category')
    // .exec()
    // .then((posts) => {
    //   console.log('posts', posts);
    //   return posts;
    // });

    // const activities = await SubjectModel.find({
    //   _id: {
    //     $in: response.fields_activity.map((item) => item.categoryId),
    //   },
    // }).populate('categoryId');

    return {
      _id: response._id,
      fields_activity: [],
      work_experience: response.work_experience,
      certificates: response.certificates,
    };
  }

  async uploadCertificate(id: string, props: ITeacherCertificate) {
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

    return {
      message: responseMessages.certificateUploadSuccessful,
    };
  }

  async removeCertificate(id: string, certificateId: string) {
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
