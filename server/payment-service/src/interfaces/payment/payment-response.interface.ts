import { PaymentHistory } from 'src/entities/payment-history.entity';

export interface IPaymentHistoryGetResponse {
  status: number;
  message?: string;
  payments: PaymentHistory[];
}

export interface ICheckoutCreateResponse {
  status: number;
  message?: string;
  session: {
    sessionId: string;
    paymentStatus: string;
    url: string;
    coins?: number;
  };
}
