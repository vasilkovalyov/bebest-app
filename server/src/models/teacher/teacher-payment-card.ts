import { Schema, model, Document } from 'mongoose';

export interface IPaymentCard {
  username: string;
  card_number: string;
}

export type IPaymentCardModelType = IPaymentCard &
  Document & {
    teacherId: Schema.Types.ObjectId | string;
  };

const TeacherPaymentCardSchema = new Schema<IPaymentCardModelType>({
  teacherId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Teacher',
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
