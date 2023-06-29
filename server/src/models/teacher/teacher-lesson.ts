import { Schema, model, Document } from 'mongoose';
import { LessonType } from '../../types/common';

export interface ITeacherLesson {
  topic: string;
  subject: string;
  description: string;
  start_date: string;
  time_start: string;
  duration_months?: number | string;
  duration_time?: string;
  max_users: number | string;
  price?: number | string;
  is_free?: boolean;
  teacher?: string;
  type: LessonType;
  modules: string[];
  students: string[];
}

export type ITeacherLessonSchemaType = Omit<
  ITeacherLesson,
  'subject' | 'teacher' | 'modules' | 'students'
> &
  Document & {
    subject: Schema.Types.ObjectId;
    teacher: Schema.Types.ObjectId;
    modules: Schema.Types.ObjectId[];
    students: Schema.Types.ObjectId[];
  };

const TeacherLessonSchema = new Schema<ITeacherLessonSchemaType>({
  topic: { type: String, required: true },
  description: { type: String, required: true },
  start_date: { type: String, required: true },
  time_start: { type: String, required: true },
  duration_months: { type: Number },
  duration_time: { type: String },
  max_users: { type: Number, required: true },
  price: {
    type: String,
  },
  is_free: { type: Boolean, required: false },
  type: {
    type: String,
    enum: ['single', 'multiple'],
    required: true,
  },
  subject: { type: Schema.Types.ObjectId, required: true, ref: 'Subjects' },
  teacher: { type: Schema.Types.ObjectId, required: true, ref: 'Teacher' },
  modules: [
    { type: Schema.Types.ObjectId, required: true, ref: 'TeacherLessonModule' },
  ],
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
  ],
});

const TeacherLessonModel = model('TeacherLesson', TeacherLessonSchema);

export default TeacherLessonModel;
