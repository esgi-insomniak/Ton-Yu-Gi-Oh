import { Injectable } from '@nestjs/common';
import { PaymentHistory } from '../entities/payment-history.entity';
import { DataSource } from 'typeorm';
import { QueryGetItems } from 'src/interfaces/common/common.response.interface';

@Injectable()
export class PaymentService {
  constructor(private dataSource: DataSource) {}

  async getPaymentHistories(query: QueryGetItems): Promise<PaymentHistory[]> {
    const paymentRepository = this.dataSource.getRepository(PaymentHistory);
    const payments = await paymentRepository.find({
      take: query.limit || 10,
      skip: query.offset * query.limit || 0,
    });
    return payments;
  }
}
