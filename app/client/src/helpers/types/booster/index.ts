import { CardIUserCardSet } from "../cards";

export interface BoosterData {
  id: string;
  ids: string[];
  set: Booster;
  count: number;
}
[];

export interface Booster {
  cardSetOnOpen: Number;
  code: string;
  id: string;
  image: string;
  name: string;
}

export interface UserBooster {
    id: string;
    set: Booster;
    userId: string;
}

export interface BoosterGetAll {
  data: UserBooster[];
};

export interface DropBooster {
    id: string;
    set: Booster;
}

export interface OpenedBooster {
    data: CardIUserCardSet[];
}
