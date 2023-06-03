import { Schema, model, Document } from 'mongoose';
import { IUser } from './user.model';

export interface ITeacher extends IUser {
  name: string;
  surname: string;
  password: string;
  phone?: string | null;
  about?: string | null;
}

export type TeacherModelType = ITeacher & Document;

export type TeacherAccountEditableModelType = Omit<
  ITeacher,
  'password' | 'userId' | 'role'
>;

const TeacherSchema = new Schema<TeacherModelType>({
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
});

const Teacher = model('Teacher', TeacherSchema);

export default Teacher;
