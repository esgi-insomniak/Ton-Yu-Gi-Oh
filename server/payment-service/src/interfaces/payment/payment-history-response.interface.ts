import { PaymentHistory } from "src/entities/payment-history.entity";

export interface IPaymentHistoryGetResponse {
  payments: PaymentHistory[];
}