import SubjectModel, { ISubjectModel } from '../models/subject.model';

class SubjectService {
  async addSubjects(subjects: ISubjectModel[]) {
    const response = SubjectModel.insertMany(subjects);
    return response;
  }

  async getSubjects() {
    const response = SubjectModel.find({});
    return response;
  }
}

export default new SubjectService();
