import { ICheckout } from './checkout.interface';

export interface ICheckoutCreateResponse {
  status: number;
  message?: string;
  session: ICheckout;
}
