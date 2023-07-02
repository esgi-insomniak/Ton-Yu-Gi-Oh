import { IPromoCode } from '../promoCode/promo-code.interface';

export interface IClaimedPromoCode {
  id: string;
  userId: string;
  promoCode: IPromoCode;
}
