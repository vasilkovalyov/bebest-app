import { Schema, model, Document, ObjectId } from 'mongoose';

export interface ITeacherCertificate {
  _id?: string;
  name: string;
  date: string;
  image?: string | null;
}

export interface ITeacherMainFieldsActivity {
  categoryId: string;
  skills: {
    _id: string;
    subject: string;
  }[];
}

export interface ITeacherMainFieldsActivityRequest
  extends Pick<ITeacherMainFieldsActivity, 'categoryId'> {
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
  certificates: ITeacherCertificate[] | [];
}

const TeacherPersonalInfoSchema = new Schema<ITeacherPersonalInfoModel>({
  teacherId: {
    type: String,
    required: true,
    ref: 'Teacher',
  },
  fields_activity: [
    {
      categoryId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Subject',
      },
      skills: [{ type: Schema.Types.ObjectId }],
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
  certificates: [
    {
      name: { type: String, required: true },
      date: { type: String, required: true },
      image: { type: String, required: true },
    },
  ],
});

const teacherPersonalInfo = model(
  'TeacherPersonalInfo',
  TeacherPersonalInfoSchema
);

export default teacherPersonalInfo;
