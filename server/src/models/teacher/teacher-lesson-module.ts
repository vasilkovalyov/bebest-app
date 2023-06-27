import { Schema, model, Document } from 'mongoose';

export interface ITeacherLessonModule {
  _id?: string;
  topic: string;
  rich_text: string;
  start_date: string;
  time_start: string;
  duration_time: string;
}

export type ITeacherLessonSchemaType = ITeacherLessonModule & Document;

const TeacherLessonModuleSchema = new Schema<ITeacherLessonSchemaType>({
  topic: { type: String, required: true },
  rich_text: { type: String, required: true },
  start_date: { type: String, required: true },
  time_start: { type: String, required: true },
  duration_time: { type: String, required: true },
});

const TeacherLessonModuleModel = model(
  'TeacherLessonModule',
  TeacherLessonModuleSchema
);

export default TeacherLessonModuleModel;
