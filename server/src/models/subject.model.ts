import { Schema, model } from 'mongoose';

export interface ISubjectCategoryModel {
  _id?: string;
  category: string;
}

// export interface ISubjectCategoriesModel {
//   categories: ISubjectCategoryModel[];
// }

const SubjectCategorySchema = new Schema<ISubjectCategoryModel>({
  category: {
    type: String,
  },
});

export const SubjectCategoryModel = model(
  'SubjectCategory',
  SubjectCategorySchema
);

export interface ISubjectsModel {
  subject: string;
  categories?: string[];
}

const SubjectsSchema = new Schema<ISubjectsModel>({
  subject: { type: String, required: true },
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: 'SubjectCategory',
    },
  ],
});

export const SubjectsModel = model('Subjects', SubjectsSchema);
