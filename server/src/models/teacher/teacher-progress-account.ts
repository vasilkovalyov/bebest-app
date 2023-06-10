import { Schema, model, Document } from 'mongoose';

export const totalStepCounts = 11;

export interface ITeacherProgressAccount {
  teacherId: string;
  about: {
    value: number;
    title?: string;
  };
  photo: {
    value: number;
    title?: string;
  };
  phone: {
    value: number;
    title?: string;
  };
  payment_card: {
    value: number;
    title?: string;
  };
  certificate: {
    value: number;
    title?: string;
  };
  experience: {
    value: number;
    title?: string;
  };
  trial_lessons: {
    value: number;
    title?: string;
  };
  personal_lessons: {
    value: number;
    title?: string;
  };
  fullname: {
    value: number;
    title?: string;
  };
  subjects: {
    value: number;
    title?: string;
  };
  video: {
    value: number;
    title?: string;
  };
  profile_progress: number;
  total_checked_count: number;
}

export type TeacherProgressAccountModelType = ITeacherProgressAccount &
  Document;

const TeacherProgressAccountSchema =
  new Schema<TeacherProgressAccountModelType>({
    teacherId: {
      type: String,
      required: true,
      ref: 'Teacher',
    },
    photo: {
      title: {
        type: String,
        default: 'Photo',
      },
      value: {
        type: Number,
        enum: [0, 1],
        default: 0,
      },
    },
    phone: {
      title: {
        type: String,
        default: 'Phone number',
      },
      value: {
        type: Number,
        enum: [0, 1],
        default: 0,
      },
    },
    about: {
      title: {
        type: String,
        default: 'Information about',
      },
      value: {
        type: Number,
        enum: [0, 1],
        default: 0,
      },
    },
    payment_card: {
      value: {
        type: Number,
        enum: [0, 1],
        default: 0,
      },
      title: {
        type: String,
        default: 'Bank data',
      },
    },
    certificate: {
      value: {
        type: Number,
        enum: [0, 1],
        default: 0,
      },
      title: {
        type: String,
        default: 'Qualification certificates',
      },
    },
    experience: {
      value: {
        type: Number,
        enum: [0, 1],
        default: 0,
      },
      title: {
        type: String,
        default: 'Experience',
      },
    },
    trial_lessons: {
      value: {
        type: Number,
        enum: [0, 1],
        default: 0,
      },
      title: {
        type: String,
        default: 'Duration and price of the trial lesson',
      },
    },
    personal_lessons: {
      value: {
        type: Number,
        enum: [0, 1],
        default: 0,
      },
      title: {
        type: String,
        default: 'Duration and price pers. occupation',
      },
    },
    fullname: {
      value: {
        type: Number,
        enum: [0, 1],
        default: 0,
      },
      title: {
        type: String,
        default: 'Name and surname',
      },
    },
    subjects: {
      value: {
        type: Number,
        enum: [0, 1],
        default: 0,
      },
      title: {
        type: String,
        default: 'The direction and skills of the field of activity',
      },
    },
    video: {
      value: {
        type: Number,
        enum: [0, 1],
        default: 0,
      },
      title: {
        type: String,
        default: 'Presentation video',
      },
    },
    profile_progress: {
      type: Number,
      default: 0,
    },
    total_checked_count: {
      type: Number,
      default: 0,
    },
  });

const teacherProgressAccount = model(
  'TeacherProgressAccount',
  TeacherProgressAccountSchema
);

export default teacherProgressAccount;
