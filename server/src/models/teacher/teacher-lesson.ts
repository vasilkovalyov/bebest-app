import { Schema, model, Document } from 'mongoose';
import { ITeacher } from './teacher.model';

export interface ITeacherLesson {
  topic: string;
  subject: string;
  description: string;
  start_date: string;
  time_start: string;
  duration_months: number | string;
  max_users: number | string;
  price?: number | string;
  is_free?: boolean;
  teacher?: string;
}

export type TeacherLessonModelType = ITeacherLesson;

export type ITeacherLessonSchemaType = Omit<
  ITeacherLesson,
  'subject' | 'teacher'
> &
  Document & {
    subject: Schema.Types.ObjectId;
    teacher: Schema.Types.ObjectId;
  };

const TeacherLessonSchema = new Schema<ITeacherLessonSchemaType>({
  topic: { type: String, required: true },
  subject: { type: Schema.Types.ObjectId, required: true, ref: 'Subjects' },
  teacher: { type: Schema.Types.ObjectId, required: true, ref: 'Teacher' },
  description: { type: String, required: true },
  start_date: { type: String, required: true },
  time_start: { type: String, required: true },
  duration_months: { type: Number, required: true },
  max_users: { type: Number, required: true },
  price: { type: String, required: true },
  is_free: { type: String, required: false, default: false },
});

const TeacherLessonModel = model('TeacherLesson', TeacherLessonSchema);

export default TeacherLessonModel;
