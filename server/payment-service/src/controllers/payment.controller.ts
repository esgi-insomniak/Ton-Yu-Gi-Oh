import { Controller, HttpStatus, Post } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { IPaymentHistoryGetResponse } from '../interfaces/payment/payment-history-response.interface';
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
    const result: IPaymentHistoryGetResponse = {
      status: HttpStatus.OK,
      payments: payments,
    };

    return result;
  }

  @MessagePattern('create_payment')
  public async createPayment(productId: string): Promise<any> {
    const payment = await this.paymentService.createPayment(productId);
    return payment;
  }
}
