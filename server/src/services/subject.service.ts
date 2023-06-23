import {
  SubjectsModel,
  SubjectCategoryModel,
  ISubjectsModel,
  // ISubjectCategoriesModel,
  ISubjectCategoryModel,
} from '../models/subject.model';

class SubjectService {
  async addSubjects(subjects: ISubjectsModel[]) {
    await SubjectsModel.insertMany(subjects);
    return 'Subject add success';
  }

  async getSubjects() {
    const response = SubjectsModel.find({})
      .populate({
        path: 'categories',
      })
      .exec();
    return response;
  }

  async addSubjectsCategories(
    subjectId: string,
    subjects_categories: ISubjectCategoryModel[]
  ) {
    subjects_categories.forEach(async (category) => {
      const subjectCategories = await new SubjectCategoryModel({
        category: category,
      });
      await subjectCategories.save();
      await SubjectsModel.findOneAndUpdate<ISubjectsModel>(
        { _id: subjectId },
        { $push: { categories: subjectCategories._id } }
      );
    });

    return 'Subject category add success';
  }
}

export default new SubjectService();
