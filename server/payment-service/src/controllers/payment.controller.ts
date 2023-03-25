import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
    IPaymentHistoryGetResponse,
} from '../interfaces/payment/payment-history-response.interface';
import { PaymentService } from '../services/payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @MessagePattern('get_payment_histories')
  public async getPaymentHistories(query: {
    limit: number;
    offset: number;
  }): Promise<IPaymentHistoryGetResponse> {
    const payments = await this.paymentService.getPaymentHistories(query);

    return {
      payments: payments,
    };
  }
}
