import { Schema, model, Document } from 'mongoose';

export interface IPaymentCard {
  teacherId?: string;
  username: string;
  card_number: string;
}

export type IPaymentCardModelType = IPaymentCard;

const TeacherPaymentCardSchema = new Schema<IPaymentCardModelType>({
  teacherId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  card_number: {
    type: String,
    required: true,
  },
});

const TeacherPaymentCardModel = model(
  'TeacherPaymentCard',
  TeacherPaymentCardSchema
);

export default TeacherPaymentCardModel;
