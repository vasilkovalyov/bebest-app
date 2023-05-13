import { Schema, model } from 'mongoose';

export interface ISubjectModel {
  category: string;
  children: {
    subject: string;
  }[];
}

const StudentSchema = new Schema<ISubjectModel>({
  category: { type: String, required: true },
  children: [
    {
      subject: { type: String, required: true },
    },
  ],
});

const Subject = model('Subject', StudentSchema);

export default Subject;
