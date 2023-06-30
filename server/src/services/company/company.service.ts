import ApiError from '../../utils/api-error';
import CompanyModel, {
  ICompanyUpdateAccountType,
} from '../../models/company/company.model';
import UserModel from '../../models/user.model';

import bcrypt from 'bcrypt';
import { uploadAvatar } from '../../utils/upload-file';
import responseMessages, {
  userWithIdNotFound,
} from '../../constants/responseMessages';

class CompanyService {
  async removeUser(id: string) {
    const user = await UserModel.deleteOne({
      userId: id,
    });

    if (!user.deletedCount)
      throw ApiError.BadRequestError(userWithIdNotFound('user', id));

    await CompanyModel.deleteOne({
      _id: id,
    });
    return true;
  }

  async changePassword(id: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const companyModel = await CompanyModel.findByIdAndUpdate(
      { _id: id },
      {
        password: hashedPassword,
      },
      {
        new: true,
      }
    );

    if (!companyModel)
      throw ApiError.BadRequestError(userWithIdNotFound('company', id));

    return {
      message: responseMessages.passwordUpdateSuccessful,
    };
  }

  async getUserInfo(id: string) {
    const companyModel = await CompanyModel.findOne({ _id: id }).select(
      '_id company_name admin_name admin_surname email role phone about avatar'
    );

    if (!companyModel) {
      throw ApiError.BadRequestError(userWithIdNotFound('company', id));
    }

    return {
      _id: companyModel._id,
      company_name: companyModel.company_name,
      admin_name: companyModel.admin_name,
      admin_surname: companyModel.admin_surname,
      avatar: companyModel.avatar,
      email: companyModel.email,
      phone: companyModel.phone,
      about: companyModel.about,
      role: companyModel.role,
    };
  }

  async uploadUserAvatar(id: string, file: string) {
    let avatarImage = '';
    if (file) {
      const res = await uploadAvatar(file);
      avatarImage = res.secure_url;
    }

    const response = await CompanyModel.findOneAndUpdate(
      { _id: id },
      {
        avatar: avatarImage,
      },
      { new: true }
    );

    if (!response)
      throw ApiError.BadRequestError(responseMessages.avatarDidNotUpdate);

    return {
      message: responseMessages.avatarUpdateSuccessful,
    };
  }

  async updateUserInfo(id: string, props: ICompanyUpdateAccountType) {
    const { ...baseProps } = props;

    const response = await CompanyModel.findOneAndUpdate(
      { _id: id },
      {
        ...baseProps,
      },
      { new: true }
    ).select('phone about avatar');

    if (!response)
      throw ApiError.BadRequestError(responseMessages.userInfoDidNotUpdate);

    return {
      message: responseMessages.userInfoUpdateSuccessful,
    };
  }
}

export default new CompanyService();
