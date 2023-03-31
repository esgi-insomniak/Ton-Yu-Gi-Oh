import { PaymentHistory } from 'src/entities/payment-history.entity';

export interface IPaymentHistoryGetResponse {
  status: number;
  message?: string;
  payments: PaymentHistory[];
}
