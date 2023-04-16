import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PaymentService } from '../services/payment.service';
import {
  GetResponseArray,
  QueryGetItems,
} from 'src/interfaces/common/common.response.interface';
import { PaymentHistory } from 'src/entities/payment-history.entity';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @MessagePattern('get_payment_histories')
  public async getPaymentHistories(
    query: QueryGetItems,
  ): Promise<GetResponseArray<PaymentHistory>> {
    const payments = await this.paymentService.getPaymentHistories(query);
    const result: GetResponseArray<PaymentHistory> = {
      status: HttpStatus.OK,
      items: payments,
    };

    return result;
  }
}
