import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  GetResponseArray,
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
    const payments = await this.paymentHistoryService.getPaymentHistories(
      query,
    );
    const result: GetResponseArray<PaymentHistory> = {
      status: HttpStatus.OK,
      items: payments,
    };

    return result;
  }
}
