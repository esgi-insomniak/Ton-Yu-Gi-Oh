import { DraggableProvided, DropResult } from "react-beautiful-dnd";
import { CardAttribute, CardFrameType, CardRace, CardRarity, CardType } from "@/helpers/utils/enum/card";
import { ApiCardAchetype, ApiCardAttType, ApiCardFrameType, ApiCardPrice, ApiCardRace } from "@/helpers/types/cards/references";

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

export interface CardData {
    id: string;
    identifiant: number;
    name: string;
    enName: string;
    description: string;
    atk: null;
    def: null;
    level: null;
    scale: null;
    linkVal: null;
    imageUrl: string;
    imageUrlSmall: string;
    type: ApiCardAttType
    frameType: ApiCardFrameType
    race: ApiCardRace
    archetype: ApiCardAchetype
    attribute: null;
    price: ApiCardPrice;
    cardSets: {
        id: string;
        price: number;
    }[];
    linkMarkers: never[];
}

export interface ApiResponse {
    data: CardData[];
}
