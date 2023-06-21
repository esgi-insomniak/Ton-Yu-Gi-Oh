import { ICardSet } from 'src/interfaces/card-service/set/set.interface';

export interface IPromoCode {
  id: string;
  code: string;
  rewardCoinsAmount?: number;
  rewardSet?: ICardSet;
  rewardSetAmount?: number;
  expirationDate?: Date;
}

export type IPromoCodePartial = Omit<IPromoCode, 'rewardSet'> & {
  rewardSetId?: string;
};
