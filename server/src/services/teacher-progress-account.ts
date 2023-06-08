import { File } from 'buffer';
import { ITeacher } from '../models/teacher.model';
import TeacherProgressAccountModel, {
  totalStepCounts,
} from '../models/teacher-progress-account';
import { ITeacherCostPersonalLesson } from '../models/teacher-personal-info';

export type TeacherProgressAccountInfoType = Pick<
  ITeacher,
  'about' | 'phone' | 'video'
>;

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

  async addPhoto(id: string, file: string) {
    const progressAccount = await TeacherProgressAccountModel.findOne({
      teacherId: id,
    });
    if (!progressAccount) return;

    let totalCountProgress = progressAccount.total_checked_count;

    totalCountProgress = this._getTotalProgressAfterUpdateValue(
      progressAccount.photo.value,
      file,
      totalCountProgress
    );

    await TeacherProgressAccountModel.findOneAndUpdate(
      { teacherId: id },
      {
        photo: {
          ...progressAccount.photo,
          value: file ? 1 : 0,
        },
        total_checked_count: totalCountProgress,
        profile_progress: getPercentOnCountData(totalCountProgress),
      },
      { new: true }
    );
  }

  async updateAccountInfo(id: string, props: TeacherProgressAccountInfoType) {
    const progressAccount = await TeacherProgressAccountModel.findOne({
      teacherId: id,
    });
    if (!progressAccount) return;

    let totalCountProgress = progressAccount.total_checked_count;

    if (progressAccount.video.value === 0) {
      totalCountProgress = this._getTotalProgressAfterUpdateValue(
        progressAccount.video.value,
        props.video,
        totalCountProgress
      );
    }

    if (props.phone) {
      totalCountProgress = this._getTotalProgressAfterUpdateValue(
        progressAccount.phone.value,
        props.phone,
        totalCountProgress
      );
    }

    if (props.about) {
      totalCountProgress = this._getTotalProgressAfterUpdateValue(
        progressAccount.about.value,
        props.about,
        totalCountProgress
      );
    }

    let videoValue: number = 0;

    if (props.video?.url && progressAccount.video.value === 0) {
      videoValue = 1;
    } else {
      videoValue = progressAccount.video.value;
    }

    await TeacherProgressAccountModel.findOneAndUpdate(
      { teacherId: id },
      {
        video: {
          ...progressAccount.video,
          value: videoValue,
        },
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
      'about photo phone payment_card certificate experience trial_lessons personal_lessons fullname subjects video profile_progress total_checked_count'
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

  async addCertificate(id: string) {
    const progressAccount = await TeacherProgressAccountModel.findOne({
      teacherId: id,
    });
    if (!progressAccount) return;

    await TeacherProgressAccountModel.findOneAndUpdate(
      { teacherId: id },
      {
        certificate: {
          ...progressAccount.certificate,
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

  async removeCertificate(id: string) {
    const progressAccount = await TeacherProgressAccountModel.findOne({
      teacherId: id,
    });
    if (!progressAccount) return;

    await TeacherProgressAccountModel.findOneAndUpdate(
      { teacherId: id },
      {
        certificate: {
          ...progressAccount.certificate,
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

  async addPaymentCard(id: string) {
    const progressAccount = await TeacherProgressAccountModel.findOne({
      teacherId: id,
    });
    if (!progressAccount) return;

    await TeacherProgressAccountModel.findOneAndUpdate(
      { teacherId: id },
      {
        payment_card: {
          ...progressAccount.payment_card,
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
  async removePaymentCard(id: string) {
    const progressAccount = await TeacherProgressAccountModel.findOne({
      teacherId: id,
    });
    if (!progressAccount) return;

    await TeacherProgressAccountModel.findOneAndUpdate(
      { teacherId: id },
      {
        payment_card: {
          ...progressAccount.payment_card,
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
