import { IPaymentHistory } from './payment-history.interface';

export interface IPaymentHistoryGetResponse {
  status: number;
  message?: string;
  payments: IPaymentHistory[];
}
