import { DraggableProvided, DropResult } from "react-beautiful-dnd";
import { CardAttribute, CardFrameType, CardRace, CardRarity, CardType } from "@/helpers/utils/enum/card";

export type CardAttributeType = keyof typeof CardAttribute
export type CardTypes = keyof typeof CardType
export type FrameType = keyof typeof CardFrameType
export type CardRarityType = keyof typeof CardRarity
export type CardRaceType = keyof typeof CardRace
export interface GameCardType {
    uniqueId: string;
    id: number;
    name: string;
    name_en: string;
    type: CardTypes;
    frameType: FrameType;
    archetype?: string;
    rarity: CardRarityType;
    setCode: string;
    race: CardRaceType;
    attribute?: CardAttributeType;
    level?: number;
    atk?: number;
    def?: number;
    image_large: string;
    image_small: string;
    dragProvided?: DraggableProvided;
    isDraggable?: boolean;
    isActive: boolean;
    isHidden: boolean;
    isFocused: boolean;
    isLoaded: boolean;
    canPop: boolean;
    canFlip: boolean;
}
export interface GameCardContextProps {
    cards: GameCardType[];
    setCards: React.Dispatch<React.SetStateAction<GameCardType[]>>;
    setIsDraggable: (card: GameCardType, isDraggable: boolean) => void;
    setIsActive: (card: GameCardType, isActive: boolean) => void;
    setIsHidden: (card: GameCardType, isHidden: boolean) => void;
    setIsFocused: (card: GameCardType, isFocused: boolean) => void;
    setCanPop: (card: GameCardType, canPop: boolean) => void;
    setCanFlip: (card: GameCardType, canFlip: boolean) => void;
    setIsLoaded: (card: GameCardType, isLoaded: boolean) => void;
    sortCards: (result: DropResult) => void;
    deactivateAllCards: () => void;
}
export interface CardIdentifier {
    id: string;
    identifiant: number;
    name: string;
    enName: string;
    description: string;
    atk: number;
    def: number;
    level: number;
    scale: null;
    linkVal: null;
    imageUrl: string;
    imageUrlSmall: string;
}
export interface ApiResponseCardSet {
    data: {
        id: string;
        card: CardIdentifier;
        set: SetCardSet;
        price: number;
        rarity: RarityCardSet;
    }[];
}

export type CardSetType = {
    id: string;
    card: CardIdentifier;
    set: SetCardSet;
    price: number;
    rarity: RarityCardSet;
}