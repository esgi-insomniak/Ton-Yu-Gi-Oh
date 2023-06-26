import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  GetResponseArray,
  GetResponseOne,
  QueryGetItems,
} from 'src/interfaces/common/common.response.interface';
import { PaymentHistory } from 'src/entities/payment-history.entity';
import { PaymentHistoryService } from 'src/services/payment-history.service';

@Controller('payment_history')
export class PaymentHistoryController {
  constructor(private readonly paymentHistoryService: PaymentHistoryService) {}

  @MessagePattern('get_payment_histories')
  public async getPaymentHistories(
    query: QueryGetItems,
  ): Promise<GetResponseArray<PaymentHistory>> {
    const paymentHistories =
      await this.paymentHistoryService.getPaymentHistories(query);
    const result: GetResponseArray<PaymentHistory> = {
      status: HttpStatus.OK,
      items: paymentHistories,
    };

    return result;
  }

  @MessagePattern('get_payment_histories_by_user_id')
  public async getPaymentHistoryByUserId(params: {
    id: string;
  }): Promise<GetResponseArray<PaymentHistory>> {
    const paymentHistories =
      await this.paymentHistoryService.getPaymentHistoryByUserId(params.id);

    const result: GetResponseArray<PaymentHistory> = {
      status: HttpStatus.OK,
      items: paymentHistories,
    };

    return result;
  }

  @MessagePattern('create_payment_history')
  public async createPaymentHistory(
    paymentHistoryPartial: Partial<PaymentHistory>,
  ): Promise<GetResponseOne<PaymentHistory>> {
    const paymentHistory =
      await this.paymentHistoryService.createPaymentHistory(
        paymentHistoryPartial,
      );

    const result: GetResponseOne<PaymentHistory> = {
      status: paymentHistory ? HttpStatus.CREATED : HttpStatus.BAD_REQUEST,
      message: paymentHistory ? null : 'Payment history is not created',
      item: paymentHistory,
    };

    return result;
  }
}
