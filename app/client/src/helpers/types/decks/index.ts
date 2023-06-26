import { CardICardSet } from "../cards";

// En dehors du helpers
export interface Card {
  id: string;
  cardSet: CardICardSet;
}

//Dans l'api hook
export type MyCards = Record<string, Card[]>;

export type MyObj = Record<
  string,
  {
    item: Card;
    count: number;
    userCardSetIds: string[];
  }
>;

//Dans les components
export interface DeckProps {
  deck: {
    cardSets: [
      id: string,
      cardSet: CardICardSet,
      userId: string,
    ];
    name: string;
    id: string;
    userId: string;
  };
}

export type CountCard = Record<string, number>;

export interface UserCardSetsProps {
  countCard: CountCard;
  addCard: (index: number) => void;
  allUserCards: SameCards[];
  isLoading: boolean;
  isError: boolean;
}

export type DecksImages = {
  id: string;
  cardSet: CardICardSet;
  index: number;
};

export interface DeckCardType {
  cardSet: CardICardSet;
  count: number;
  id: string;
}

export interface SameCards {
  item: Card;
  count: number;
  userCardSetIds: string[];
}
