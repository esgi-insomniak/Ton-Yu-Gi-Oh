import { IUpdateCheckout } from './update.interface';

export interface IUpdateCheckoutResponse {
  status: number;
  message?: string;
  session: IUpdateCheckout;
}
