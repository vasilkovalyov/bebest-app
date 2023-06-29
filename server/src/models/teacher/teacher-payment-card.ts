import { Schema, model, Document } from 'mongoose';

export interface IPaymentCard {
  teacherId?: string;
  username: string;
  card_number: string;
}

const TeacherPaymentCardSchema = new Schema<IPaymentCard>({
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
