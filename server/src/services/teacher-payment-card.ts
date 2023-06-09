import ApiError from '../utils/api-error';

import teacherProgressAccountService from '../services/teacher-progress-account';

import PaymentCardModel, { IPaymentCard } from '../models/teacher-payment-card';
import responseMessages from '../constants/responseMessages';

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
      message: responseMessages.paymentCardAddSuccessful,
    };
  }
  async removePaymentCard(id: string) {
    const paymentCardResponse = await PaymentCardModel.deleteOne({
      teacherId: id,
    });

    if (paymentCardResponse.deletedCount === 0) {
      throw ApiError.BadRequestError(responseMessages.paymentCardNotFound);
    }

    await teacherProgressAccountService.removePaymentCard(id);

    return {
      message: responseMessages.paymentCardRemoveSuccessful,
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
