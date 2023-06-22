import {
  SubjectsModel,
  SubjectCategoryModel,
  ISubjectsModel,
  // ISubjectCategoriesModel,
  ISubjectCategoryModel,
} from '../models/subject.model';

class SubjectService {
  async addSubjects(subjects: ISubjectsModel[]) {
    const response = SubjectsModel.insertMany(subjects);
    return response;
  }

  async getSubjects() {
    const response = SubjectsModel.find({})
      .populate({
        path: 'categories',
        populate: {
          path: 'category',
        },
      })
      .exec();
    return response;
  }

  async addSubjectsCategories(
    subjectId: string,
    categories: ISubjectCategoryModel[]
  ) {
    const subjectCategories = await new SubjectCategoryModel.insertMany(
      categories
    );

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
    return {
      message: 1,
    };
  }
}

export default new SubjectService();
