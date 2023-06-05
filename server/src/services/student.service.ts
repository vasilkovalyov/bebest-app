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

class StudentService {
  async removeUser(id: string) {
    const user = await UserModel.deleteOne({
      userId: id,
    });

    if (!user)
      throw ApiError.BadRequestError(`User with id ${id} not a found!`);

    const studentUser = await StudentModel.deleteOne({
      _id: id,
    });

    if (!studentUser)
      throw ApiError.BadRequestError(`Student with id ${id} not a found!`);

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
      throw ApiError.BadRequestError(`Student with id ${id} not a found!`);

    return {
      message: 'Password has updated successfull!',
    };
  }

  async getUserInfo(id: string) {
    const studentModel = await StudentModel.findOne({ _id: id }).select(
      '_id name surname email role phone about'
    );

    if (!studentModel) {
      throw ApiError.BadRequestError(`Student with id ${id} not a found!`);
    }

    return studentModel;
  }

  async updateUserInfo(id: string, props: StudentAccountEditableModelType) {
    const response = await StudentModel.findOneAndUpdate(
      { _id: id },
      {
        ...props,
      },
      { new: true }
    );

    if (!response) throw ApiError.BadRequestError('Student did not update');

    return {
      message: 'Student info update successfull',
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
      message: 'Subject add successfull!',
    };
  }

  async removeSubject(userId: string, subjectId: string) {
    const response = await StudentSubjectsModel.findOneAndUpdate(
      {
        studentId: userId,
      },
      { $pull: { subjects: { _id: subjectId } } },
      { new: true }
    );
    return {
      message: 'Subject removed successfull!',
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
