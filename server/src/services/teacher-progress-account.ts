import ApiError from '../utils/api-error';
import {
  ITeacher,
  TeacherAccountEditableModelType,
} from '../models/teacher.model';
import TeacherProgressAccountModel, {
  ITeacherProgressAccount,
  totalStepCounts,
} from '../models/teacher-progress-account';
import { ITeacherCostPersonalLesson } from '../models/teacher-personal-info';

export type TeacherProgressAccountInfoType = Pick<ITeacher, 'about' | 'phone'>;

function getPercentOnCountData(count: number) {
  return Math.round((count / totalStepCounts) * 100);
}

class TeacherProgressAccountService {
  private _getTotalProgressAfterUpdateValue(pointValue, newValue, totalCount) {
    let total = totalCount;
    if (!pointValue) {
      if (newValue) {
        total += 1;
      }
    } else if (!newValue) {
      total -= 1;
    }
    return total;
  }

  async createBaseAccountProgress(id: string) {
    const account = await TeacherProgressAccountModel.findOne({
      teacherId: id,
    });
    if (!account) {
      const data = await new TeacherProgressAccountModel({
        teacherId: id,
        fullname: {
          value: 1,
        },
        total_checked_count: 1,
        profile_progress: getPercentOnCountData(1),
      });
      const response = await data.save();
      return response;
    }
    return null;
  }

  async updateAccountInfo(id: string, props: TeacherProgressAccountInfoType) {
    const progressAccount = await TeacherProgressAccountModel.findOne({
      teacherId: id,
    });
    if (!progressAccount) return;

    let totalCountProgress = progressAccount.total_checked_count;
    totalCountProgress = this._getTotalProgressAfterUpdateValue(
      progressAccount.phone.value,
      props.phone,
      totalCountProgress
    );
    totalCountProgress = this._getTotalProgressAfterUpdateValue(
      progressAccount.about.value,
      props.about,
      totalCountProgress
    );

    await TeacherProgressAccountModel.findOneAndUpdate(
      { teacherId: id },
      {
        phone: {
          ...progressAccount.phone,
          value: props.phone ? 1 : 0,
        },
        about: {
          ...progressAccount.about,
          value: props.about ? 1 : 0,
        },
        total_checked_count: totalCountProgress,
        profile_progress: getPercentOnCountData(totalCountProgress),
      },
      { new: true }
    );
  }

  async getAccountProgress(id: string) {
    const account = await TeacherProgressAccountModel.findOne({
      teacherId: id,
    }).select(
      'about photo phone bank_data certificate experience trial_lessons personal_lessons fullname subjects video profile_progress total_checked_count'
    );
    return account;
  }

  async addMainActivity(id: string) {
    const progressAccount = await TeacherProgressAccountModel.findOne({
      teacherId: id,
    });
    if (!progressAccount) return;

    await TeacherProgressAccountModel.findOneAndUpdate(
      { teacherId: id },
      {
        subjects: {
          ...progressAccount.subjects,
          value: 1,
        },
        total_checked_count: progressAccount.total_checked_count + 1,
        profile_progress: getPercentOnCountData(
          progressAccount.total_checked_count + 1
        ),
      },
      { new: true }
    );
  }

  async removeMainActivity(id: string) {
    const progressAccount = await TeacherProgressAccountModel.findOne({
      teacherId: id,
    });
    if (!progressAccount) return;

    await TeacherProgressAccountModel.findOneAndUpdate(
      { teacherId: id },
      {
        subjects: {
          ...progressAccount.subjects,
          value: 0,
        },
        total_checked_count: progressAccount.total_checked_count - 1,
        profile_progress: getPercentOnCountData(
          progressAccount.total_checked_count - 1
        ),
      },
      { new: true }
    );
  }

  async updatePriceLessons(id: string, props: ITeacherCostPersonalLesson) {
    const progressAccount = await TeacherProgressAccountModel.findOne({
      teacherId: id,
    });
    if (!progressAccount) return;

    let totalCountProgress = progressAccount.total_checked_count;

    totalCountProgress = this._getTotalProgressAfterUpdateValue(
      progressAccount.personal_lessons.value,
      props.duration,
      totalCountProgress
    );
    totalCountProgress = this._getTotalProgressAfterUpdateValue(
      progressAccount.trial_lessons.value,
      props.trial_duration,
      totalCountProgress
    );

    await TeacherProgressAccountModel.findOneAndUpdate(
      { teacherId: id },
      {
        personal_lessons: {
          ...progressAccount.trial_lessons,
          value: props.duration ? 1 : 0,
        },
        trial_lessons: {
          ...progressAccount.trial_lessons,
          value: props.trial_duration ? 1 : 0,
        },
        total_checked_count: totalCountProgress,
        profile_progress: getPercentOnCountData(totalCountProgress),
      },
      { new: true }
    );
  }

  async addWorkExperience(id: string) {
    const progressAccount = await TeacherProgressAccountModel.findOne({
      teacherId: id,
    });
    if (!progressAccount) return;

    await TeacherProgressAccountModel.findOneAndUpdate(
      { teacherId: id },
      {
        experience: {
          ...progressAccount.experience,
          value: 1,
        },
        total_checked_count: progressAccount.total_checked_count + 1,
        profile_progress: getPercentOnCountData(
          progressAccount.total_checked_count + 1
        ),
      },
      { new: true }
    );
  }

  async removeWorkExperience(id: string) {
    const progressAccount = await TeacherProgressAccountModel.findOne({
      teacherId: id,
    });
    if (!progressAccount) return;

    await TeacherProgressAccountModel.findOneAndUpdate(
      { teacherId: id },
      {
        experience: {
          ...progressAccount.experience,
          value: 0,
        },
        total_checked_count: progressAccount.total_checked_count - 1,
        profile_progress: getPercentOnCountData(
          progressAccount.total_checked_count - 1
        ),
      },
      { new: true }
    );
  }
}

export default new TeacherProgressAccountService();
