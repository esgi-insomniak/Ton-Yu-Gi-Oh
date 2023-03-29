import { IUserCardSet } from '../userCardSet/user-card-set.interface';
import { IUserDeck } from '../userDeck/user-deck.interface';
import { IUserSet } from '../userSet/user-set.interface';

export interface IUser extends Document {
  id: string;
  username: string;
  email: string;
  phone: string;
  coins: number;
  roles: string[];
  sets: IUserSet[];
  cardSets: IUserCardSet[];
  decks: IUserDeck[];
}
