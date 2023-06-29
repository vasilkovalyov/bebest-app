import { Schema, model } from 'mongoose';
import { UserRole } from 'types/role';

export interface IUser {
  userId: String;
  email: string;
  role: UserRole;
}

export const UserSchema = new Schema<IUser>({
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
