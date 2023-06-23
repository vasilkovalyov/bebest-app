import { File } from 'buffer';
import { Schema, model, Document } from 'mongoose';
import { IUser } from '../user.model';
import { IVideo } from '../../interfaces/common';

export interface ITeacher extends IUser {
  name: string;
  surname: string;
  password: string;
  phone?: string | null;
  about?: string | null;
  avatar?: string | null;
  video?: IVideo | null;
  activated: boolean;
  personalInfoId?: string;
  progressAccount: string;
  paymentCard?: string;
}

export type ITeacherSchemaType = Omit<
  ITeacher,
  'personalInfoId' | 'progressAccount'
> &
  Document & {
    personalInfoId: Schema.Types.ObjectId;
    progressAccount: Schema.Types.ObjectId;
  };

export type ITeacherAccountEditableProps = Omit<
  ITeacher,
  'password' | 'userId' | 'role' | 'video'
> & {
  video?: (File & { tempFilePath: string }) | null;
};

const TeacherSchema = new Schema<ITeacherSchemaType>({
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
  activated: {
    type: Boolean,
    default: false,
  },
  personalInfoId: {
    type: Schema.Types.ObjectId,
    ref: 'TeacherPersonalInfo',
  },
  progressAccount: {
    type: Schema.Types.ObjectId,
    ref: 'TeacherProgressAccount',
  },
  paymentCard: {
    type: Schema.Types.ObjectId,
    ref: 'TeacherPaymentCard',
  },
});

const Teacher = model('Teacher', TeacherSchema);

export default Teacher;
