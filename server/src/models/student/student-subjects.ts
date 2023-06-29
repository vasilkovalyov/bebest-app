import { Schema, model, Document } from 'mongoose';

export interface IStudentSubject {
  subject_study: string;
  level_mastery_subject: string;
}

export interface IStudentSubjects {
  studentId: Schema.Types.ObjectId;
  subjects: IStudentSubject[];
}

export type IStudentSubjectsSchemaType = IStudentSubjects & Document;

const StudentSubjectsSchema = new Schema<IStudentSubjectsSchemaType>({
  studentId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Student',
  },
  subjects: [
    {
      subject_study: { type: String, required: true },
      level_mastery_subject: { type: String },
    },
  ],
});

const StudentSubjects = model('StudentSubjects', StudentSubjectsSchema);

export default StudentSubjects;
