import { Schema, Document, model } from 'mongoose';
import { UserRole } from 'types/role';

export interface IUser {
  userId: String;
  email: string;
  role: UserRole;
}

export type IUserSchemaType = IUser & Document;

export const UserSchema = new Schema<IUserSchemaType>({
  email: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  role: {
    type: String,
    enum: ['student', 'teacher', 'company'],
    required: true,
  },
});

const User = model('User', UserSchema);

export default User;
