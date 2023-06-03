import { Schema, model, Document } from 'mongoose';

export interface ITeacherMainFieldsActivity {
  activity: string;
  skills: string[];
}

export interface ITeacherCostPersonalLesson {
  duration: string;
  price: string;
  is_free: boolean;
  trial_duration: string;
  trial_price: string;
  is_trial_free: boolean;
  use_trial: string;
}

export interface ITeacherWorkExperience {
  company_name: string;
  description: string | null;
  startDate: string;
  endDate: string | null;
  isStillWorking: boolean;
}

export type TeacherMainFieldsActivityModelType = ITeacherMainFieldsActivity &
  Document;
export type TeacherCostPersonalLessonModelType = ITeacherCostPersonalLesson &
  Document;
export type TeacherWorkExperienceModelType = ITeacherWorkExperience & Document;

export interface ITeacherPersonalInfoModel {
  teacherId: string;
  fields_activity: ITeacherMainFieldsActivity[] | [];
  personal_lessons: ITeacherCostPersonalLesson;
  work_experience: ITeacherWorkExperience[] | [];
}

const TeacherPersonalInfoSchema = new Schema<ITeacherPersonalInfoModel>({
  teacherId: {
    type: String,
    required: true,
    ref: 'Teacher',
  },
  fields_activity: [
    {
      activity: { type: String, required: true },
      skills: [{ type: String }],
    },
  ],
  personal_lessons: {
    duration: {
      type: String,
    },
    price: {
      type: String,
    },
    is_free: {
      type: Boolean,
    },
    trial_duration: {
      type: String,
    },
    trial_price: {
      type: String,
    },
    is_trial_free: {
      type: Boolean,
    },
    use_trial: {
      type: String,
    },
  },
  work_experience: [
    {
      company_name: {
        type: String,
        require: true,
      },
      description: {
        type: String,
      },
      startDate: {
        type: String,
      },
      endDate: {
        type: String,
      },
      isStillWorking: {
        type: Boolean,
      },
    },
  ],
});

const teacherPersonalInfo = model(
  'TeacherPersonalInfo',
  TeacherPersonalInfoSchema
);

export default teacherPersonalInfo;
