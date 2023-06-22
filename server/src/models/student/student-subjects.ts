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
    studentId: Schema.Types.ObjectId;
  };

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
