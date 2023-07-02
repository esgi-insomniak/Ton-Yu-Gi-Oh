import { DraggableProvided, DropResult } from "react-beautiful-dnd";
import {
  CardAttribute,
  CardFrameType,
  CardRace,
  CardRarity,
  CardType,
} from "@/helpers/utils/enum/card";

interface ICommonNameId {
  id: string;
  name: string;
}

export interface CardIArchetype extends ICommonNameId { }

export interface CardIAttribute extends ICommonNameId {
  name: keyof typeof CardAttribute;
}

export interface CardICardSet {
  id: string;
  card: ICard;
  set: CardISet;
  rarity: CardIRarity;
  price: number;
}

export interface CardIUserCardSet {
  id: string,
  userId: string,
  cardSet: CardICardSet
}

export interface ICard extends ICommonNameId {
  identifiant: number;
  enName: string;
  description: string;
  atk?: number;
  def?: number;
  level?: number;
  scale?: number;
  linkVal?: number;
  imageUrl: string;
  imageUrlSmall: string;
  type: CardIType;
  frameType: CardIFrameType;
  race: CardIRace;
  archetype?: CardIArchetype;
  attribute?: CardIAttribute;
  price: CardIPrice;
  cardSets: CardICardSet[];
  linkMarkers: CardILinkMarker[];
}

export interface CardIFrameType extends ICommonNameId {
  name: keyof typeof CardFrameType;
}

export interface CardILinkMarker extends ICommonNameId { }

export interface CardIPrice {
  id: string;
  card: ICard;
  cardMarketPrice: number;
  tcgPlayerPrice: number;
  ebayPrice: number;
  amazonPrice: number;
  coolStuffIncPrice: number;
}

export interface CardIRace extends ICommonNameId {
  name: keyof typeof CardRace;
}

export interface CardIRarity extends ICommonNameId {
  name: keyof typeof CardRarity;
  code: string
}

export interface CardISet extends ICommonNameId {
  code: string;
  image: string;
  cardSets: CardICardSet[];
}

export interface CardIType extends ICommonNameId {
  name: keyof typeof CardType;
}

export interface IGameCard extends CardICardSet {
  dragProvided?: DraggableProvided;
  isDraggable?: boolean;
  isActive: boolean;
  isHidden: boolean;
  isFocused: boolean;
  isLoaded: boolean;
  canPop: boolean;
  displayCardInfoOnPop: boolean;
  popScale: number;
  canFlip: boolean;
  canActivate: boolean;
  canInteract: boolean;
  userCardSetId?: string;
}

export interface IGameCardContextProps {
  cardSets: IGameCard[];
  setCardSets: React.Dispatch<React.SetStateAction<IGameCard[]>>;
  setIsDraggable: (card: IGameCard, isDraggable: boolean) => void;
  setIsActive: (card: IGameCard, isActive: boolean) => void;
  setIsHidden: (card: IGameCard, isHidden: boolean) => void;
  setIsFocused: (card: IGameCard, isFocused: boolean) => void;
  setCanPop: (card: IGameCard, canPop: boolean, displayCardInfoOnPop: boolean, popScale: number) => void;
  setCanFlip: (card: IGameCard, canFlip: boolean) => void;
  setCanActivate: (card: IGameCard, canActivate: boolean) => void;
  setCanInteract: (card: IGameCard, canInteract: boolean) => void;
  setIsLoaded: (card: IGameCard, isLoaded: boolean) => void;
  sortCardSets: (result: DropResult) => void;
  deactivateAllCardSets: () => void;
}

export interface CardSet {
  id: string;
  price: number;
  card: ICard;
}

export interface IUserCardSets {
  id: string;
  userId: string;
  cardSet: CardSet[];
}