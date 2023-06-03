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

    const arrProgress: number[] = [progressAccount.fullname.value];
    let totalCount = progressAccount.total_checked_count;

    if (!progressAccount.phone.value) {
      arrProgress.push(1);
      totalCount += 1;
    }
    if (!progressAccount.about.value) {
      arrProgress.push(1);
      totalCount += 1;
    }

    await TeacherProgressAccountModel.findOneAndUpdate(
      { teacherId: id },
      {
        phone: {
          value: props.phone ? 1 : 0,
        },
        about: {
          value: props.about ? 1 : 0,
        },
        total_checked_count: totalCount,
        profile_progress: getPercentOnCountData(arrProgress.length),
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

    let totalCount = progressAccount.total_checked_count;

    if (props.duration) {
      console.log('duration true', props.duration);
      totalCount += 1;
    } else {
      console.log('duration false', props.duration);
      totalCount -= 1;
    }
    if (props.trial_duration) {
      console.log('trial duration true', props.trial_duration);
      totalCount += 1;
    } else {
      console.log('trial duration false', props.trial_duration);
      totalCount -= 1;
    }

    await TeacherProgressAccountModel.findOneAndUpdate(
      { teacherId: id },
      {
        personal_lessons: {
          value: props.duration ? 1 : 0,
        },
        trial_lessons: {
          value: props.trial_duration ? 1 : 0,
        },
        total_checked_count: totalCount,
        profile_progress: getPercentOnCountData(totalCount),
      },
      { new: true }
    );
  }
}

export default new TeacherProgressAccountService();
