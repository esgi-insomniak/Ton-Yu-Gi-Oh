import { Injectable } from '@nestjs/common';
import { PaymentHistory } from '../entities/payment-history.entity';
import { DataSource, DeepPartial } from 'typeorm';
import { QueryGetItems } from 'src/interfaces/common/common.response.interface';

@Injectable()
export class PaymentHistoryService {
  constructor(private readonly dataSource: DataSource) {}

  async getPaymentHistories(query: QueryGetItems): Promise<PaymentHistory[]> {
    const paymentHistories = await this.dataSource
      .getRepository(PaymentHistory)
      .find({
        take: query.limit || 10,
        skip: query.offset * query.limit || 0,
      });
    return paymentHistories;
  }

  async getPaymentHistoryByUserId(userId: string): Promise<PaymentHistory[]> {
    const paymentHistories = await this.dataSource
      .getRepository(PaymentHistory)
      .find({
        where: { userId: userId },
      });
    return paymentHistories;
  }

  async createPaymentHistory(
    paymentHistoryPartial: DeepPartial<PaymentHistory>,
  ): Promise<PaymentHistory> {
    try {
      return await this.dataSource
        .getRepository(PaymentHistory)
        .save(paymentHistoryPartial);
    } catch {
      return null;
    }
  }
}
