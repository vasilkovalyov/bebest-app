import { Schema, model, Document } from 'mongoose';
import { IUser } from './user.model';
import { IStudentSubject } from './student-subjects';
import { File } from 'buffer';

export interface IStudent extends IUser {
  avatar?: string;
  name: string;
  surname: string;
  password: string;
  phone?: string | null;
  about?: string | null;
  subjects?: IStudentSubject[] | [];
}

export type StudentModelType = IStudent & Document;

export type StudentAccountEditableModelType = Omit<
  IStudent,
  'password' | 'userId' | 'role' | 'avatar'
> & {
  avatar?: File;
};

const StudentSchema = new Schema<StudentModelType>({
  avatar: {
    type: String,
  },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['student', 'teacher', 'company'],
    required: true,
  },
  phone: { type: String, required: false, default: null },
  about: { type: String, required: false, default: null },
  subjects: {
    ref: 'StudentSubjects',
    type: Schema.Types.ObjectId,
  },
});

const Student = model('Student', StudentSchema);

export default Student;
