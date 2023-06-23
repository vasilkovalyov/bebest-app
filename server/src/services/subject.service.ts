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
    categories: ISubjectCategoryModel[]
  ) {
    const subjectCategories = await new SubjectCategoryModel({
      categories: categories,
    });

    const subjectCategoriesResponse = await subjectCategories.save();

    await SubjectsModel.findOneAndUpdate<ISubjectsModel>(
      { _id: subjectId },
      {
        categories: subjectCategoriesResponse.categories.map(
          (item) => item._id
        ),
      },
      {
        new: true,
      }
    );
    return 'Subject category add success';
  }
}

export default new SubjectService();
