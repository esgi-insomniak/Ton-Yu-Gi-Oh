export interface IPaymentHistory extends Document {
  id: string;
  userId: string;
  coinsAmount: number;
  stripeInfo: string;
}
