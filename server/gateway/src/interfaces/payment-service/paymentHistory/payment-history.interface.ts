export interface IPaymentHistory {
  id: string;
  sessionId: string;
  userId: string;
  coinsAmount: number;
  stripeInfo: string;
}
