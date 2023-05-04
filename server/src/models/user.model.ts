import { Schema, Document, model } from 'mongoose';
import { UserRole } from 'types/role';

export interface IUser {
  userId: String;
  email: string;
  password: string;
  role: UserRole;
}

export type UserModelType = IUser & Document;

export const UserSchema = new Schema<UserModelType>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userId: { type: String, required: true },
  role: {
    type: String,
    enum: ['student', 'teacher', 'company'],
    required: true,
  },
});

const User = model('User', UserSchema);

export default User;
