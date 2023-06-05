import { File } from 'buffer';
import { Schema, model, Document } from 'mongoose';
import { IUser } from './user.model';
import { IStudentSubject } from './student-subjects';

export interface IStudent extends IUser {
  name: string;
  surname: string;
  password: string;
  phone?: string | null;
  about?: string | null;
  avatar?: string;
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
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: false, default: null },
  about: { type: String, required: false, default: null },
  avatar: {
    type: String,
    default: null,
  },
  subjects: {
    ref: 'StudentSubjects',
    type: Schema.Types.ObjectId,
  },
  role: {
    type: String,
    enum: ['student', 'teacher', 'company'],
    required: true,
  },
});

const Student = model('Student', StudentSchema);

export default Student;
