import StudentModel from '../../models/student/student.model';
import StudentSubjectsModel, {
  IStudentSubject,
  IStudentSubjectsSchemaType,
} from '../../models/student/student-subjects';
import responseStudentMessages from '../../constants/responseStudentMessages';

class StudentSubjectService {
  async addSubjects(_id: string, props: IStudentSubject) {
    const response =
      await StudentSubjectsModel.findOne<IStudentSubjectsSchemaType>({
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

export default new StudentSubjectService();
