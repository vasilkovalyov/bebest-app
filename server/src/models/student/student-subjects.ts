import { Schema, model, Document } from 'mongoose';

export interface IStudentSubject {
  subject_study: string;
  level_mastery_subject: string;
}

export interface IStudentSubjects {
  subjects: IStudentSubject[];
}

export type IStudentSubjectsSchemaType = IStudentSubjects &
  Document & {
    studentId: string;
  };

const StudentSubjectsSchema = new Schema<IStudentSubjectsSchemaType>({
  studentId: {
    type: String,
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
