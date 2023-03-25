import { Injectable } from '@nestjs/common';
import { PaymentHistory } from '../entities/payment-history.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class PaymentService {
  constructor(private dataSource: DataSource) {}

  async getPaymentHistories(query: { limit: number; offset: number }): Promise<PaymentHistory[]> {
    const paymentRepository = this.dataSource.getRepository(PaymentHistory);
    const payments = await paymentRepository.find({
      take: query.limit || 10,
      skip: query.offset * query.limit || 0,
    });
    return payments;
  }
}
