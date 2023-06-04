import ApiError from '../utils/api-error';

import teacherProgressAccountService from '../services/teacher-progress-account';

import PaymentCardModel, { IPaymentCard } from '../models/teacher-payment-card';

class TeacherPaymentCardService {
  async addPaymentCard(id: string, props: IPaymentCard) {
    const paymentCardResponse = await new PaymentCardModel({
      teacherId: id,
      card_number: props.card_number,
      username: props.username,
    });
    await paymentCardResponse.save();
    await teacherProgressAccountService.addPaymentCard(id);

    return {
      message: 'Teacher credit card add successfull!',
    };
  }
  async removePaymentCard(id: string) {
    const paymentCardResponse = await PaymentCardModel.deleteOne({
      teacherId: id,
    });

    if (paymentCardResponse.deletedCount === 0) {
      throw ApiError.BadRequestError(`Payment card  not a found!`);
    }

    await teacherProgressAccountService.removePaymentCard(id);

    return {
      message: 'Teacher credit card remove successfull!',
    };
  }

  async getPaymentCard(id: string) {
    const response = await PaymentCardModel.findOne({ teacherId: id }).select(
      'username card_number'
    );
    return response;
  }
}

export default new TeacherPaymentCardService();
