import ApiError from '../utils/api-error';
import StudentModel, {
  StudentAccountEditableModelType,
} from '../models/student.model';
import StudentSubjectsModel, {
  IStudentSubject,
  StudentSubjectsModelType,
} from '../models/student-subjects';
import UserModel from '../models/user.model';
import bcrypt from 'bcrypt';
import { uploadAvatar } from '../utils/upload-file';
import responseMessages, {
  userWithIdNotFound,
} from '../constants/responseMessages';
import responseStudentMessages from '../constants/responseStudentMessages';

class StudentService {
  async removeUser(id: string) {
    const user = await UserModel.deleteOne({
      userId: id,
    });

    if (!user) throw ApiError.BadRequestError(userWithIdNotFound('user', id));

    const studentUser = await StudentModel.deleteOne({
      _id: id,
    });

    if (!studentUser)
      throw ApiError.BadRequestError(userWithIdNotFound('student', id));

    return true;
  }

  async changePassword(id: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const studentModel = await StudentModel.findByIdAndUpdate(
      { _id: id },
      {
        password: hashedPassword,
      },
      {
        new: true,
      }
    );

    if (!studentModel)
      throw ApiError.BadRequestError(userWithIdNotFound('student', id));

    return {
      message: responseMessages.passwordUpdateSuccessful,
    };
  }

  async getUserInfo(id: string) {
    const studentModel = await StudentModel.findOne({ _id: id }).select(
      '_id name surname email role phone about avatar'
    );

    if (!studentModel) {
      throw ApiError.BadRequestError(userWithIdNotFound('student', id));
    }

    return studentModel;
  }

  async uploadUserAvatar(id: string, file: string) {
    let avatarImage = '';
    if (file) {
      const res = await uploadAvatar(file);
      avatarImage = res.secure_url;
    }

    const response = await StudentModel.findOneAndUpdate(
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

  async updateUserInfo(id: string, props: StudentAccountEditableModelType) {
    let avatarImage = '';
    if (props.avatar || props.avatar === null) {
      const res = await uploadAvatar(props.avatar);
      avatarImage = res.secure_url;
    }

    const response = await StudentModel.findOneAndUpdate(
      { _id: id },
      {
        ...props,
        avatar: avatarImage,
      },
      { new: true }
    );

    if (!response) throw ApiError.BadRequestError('Student did not update');

    return {
      message: responseMessages.userInfoUpdateSuccessful,
    };
  }

  async addSubjects(_id: string, props: IStudentSubject) {
    const response =
      await StudentSubjectsModel.findOne<StudentSubjectsModelType>({
        studentId: _id,
      });

    if (response) {
      await StudentSubjectsModel.findOneAndUpdate(
        { studentId: _id },
        { $push: { subjects: props } },
        { new: true }
      );
    } else {
      const studentSubject = await new StudentSubjectsModel({
        studentId: _id,
        subjects: props,
      });
      const response = await studentSubject.save();
      await StudentModel.findOneAndUpdate({ _id }, { subjects: response._id });
    }

    return {
      message: responseStudentMessages.subjectAddSuccessful,
    };
  }

  async removeSubject(userId: string, subjectId: string) {
    await StudentSubjectsModel.findOneAndUpdate(
      {
        studentId: userId,
      },
      { $pull: { subjects: { _id: subjectId } } },
      { new: true }
    );
    return {
      message: responseStudentMessages.subjectRemoveSuccessful,
    };
  }

  async getSubjects(_id: string) {
    const response = await StudentSubjectsModel.findOne({
      studentId: _id,
    }).select('subjects');
    return response;
  }
}

export default new StudentService();
