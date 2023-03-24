import { IUserCardSet } from '../userCardSet/user-card-set.interface';
import { IUserDeck } from '../userDeck/user-deck.interface';
import { IUserSet } from '../userSet/user-set.interface';

export interface IUser extends Document {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  coins: number;
  sets: IUserSet[];
  cardSets: IUserCardSet[];
  decks: IUserDeck[];
}
