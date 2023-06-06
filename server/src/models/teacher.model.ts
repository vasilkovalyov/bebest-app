import { File } from 'buffer';
import { Schema, model, Document } from 'mongoose';
import { IUser } from './user.model';

export interface IVideo {
  width: number;
  height: number;
  format: string;
  resource_type: string;
  bytes: number;
  url: string;
  secure_url: string;
  playback_url: string;
}

export interface ITeacher extends IUser {
  name: string;
  surname: string;
  password: string;
  phone?: string | null;
  about?: string | null;
  avatar?: string | null;
  video?: IVideo | null;
}

export type TeacherModelType = ITeacher & Document;

export type TeacherAccountEditableModelType = Omit<
  ITeacher,
  'password' | 'userId' | 'role' | 'video'
> & {
  video?: (File & { tempFilePath: string }) | null;
};

const TeacherSchema = new Schema<TeacherModelType>({
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
  video: {
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
    format: {
      type: String,
    },
    resource_type: {
      type: String,
    },
    bytes: {
      type: Number,
    },
    url: {
      type: String,
    },
    secure_url: {
      type: String,
    },
    playback_url: {
      type: String,
    },
  },
  role: {
    type: String,
    enum: ['student', 'teacher', 'company'],
    required: true,
  },
});

const Teacher = model('Teacher', TeacherSchema);

export default Teacher;
