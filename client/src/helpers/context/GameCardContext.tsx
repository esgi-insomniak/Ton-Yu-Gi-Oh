import React from 'react';
import { DropResult } from 'react-beautiful-dnd';
import { GameCardType } from '../../components/GameCard';

interface GameCardContextProps {
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

const GameCardContext = React.createContext<GameCardContextProps>({
    cards: [],
    setCards: () => { },
    setIsDraggable: () => { },
    setIsActive: () => { },
    setIsHidden: () => { },
    setIsFocused: () => { },
    setCanPop: () => { },
    setCanFlip: () => { },
    setIsLoaded: () => { },
    sortCards: () => { },
    deactivateAllCards: () => { }
});

export const GameCardProvider = ({ children }: { children: React.ReactNode }) => {
    const [cards, setCards] = React.useState<GameCardType[]>([]);

    const setIsDraggable = (card: GameCardType, isDraggable: boolean) => {
        setCards((prevState) => {
            if (!prevState) return prevState;

            const updatedCards = prevState.map((updatedCard) => {
                if (card.uniqueId === updatedCard.uniqueId) {
                    return { ...updatedCard, isDraggable };
                }
                return updatedCard;
            });
            return updatedCards;
        });
    };

    const setIsActive = (card: GameCardType, isActive: boolean) => {
        setCards((prevState) => {
            if (!prevState) return prevState;

            const updatedCards = prevState.map((updatedCard) => {
                if (card.uniqueId === updatedCard.uniqueId) {
                    return { ...updatedCard, isActive };
                }
                return updatedCard;
            });
            return updatedCards;
        });
    };

    const setIsHidden = (card: GameCardType, isHidden: boolean) => {
        setCards((prevState) => {
            if (!prevState) return prevState;

            const updatedCards = prevState.map((updatedCard) => {
                if (card.uniqueId === updatedCard.uniqueId) {
                    return { ...updatedCard, isHidden };
                }
                return updatedCard;
            });
            return updatedCards;
        });
    };

    const setIsFocused = (card: GameCardType, isFocused: boolean) => {
        setCards((prevState) => {
            if (!prevState) return prevState;

            const updatedCards = prevState.map((updatedCard) => {
                if (card.uniqueId === updatedCard.uniqueId) {
                    return { ...updatedCard, isFocused };
                }
                return updatedCard;
            });
            return updatedCards;
        });
    };

    const setCanPop = (card: GameCardType, canPop: boolean) => {
        setCards((prevState) => {
            if (!prevState) return prevState;

            const updatedCards = prevState.map((updatedCard) => {
                if (card.uniqueId === updatedCard.uniqueId) {
                    return { ...updatedCard, canPop };
                }
                return updatedCard;
            });
            return updatedCards;
        });
    };

    const setCanFlip = (card: GameCardType, canFlip: boolean) => {
        setCards((prevState) => {
            if (!prevState) return prevState;

            const updatedCards = prevState.map((updatedCard) => {
                if (card.uniqueId === updatedCard.uniqueId) {
                    return { ...updatedCard, canFlip };
                }
                return updatedCard;
            });
            return updatedCards;
        });
    };

    const setIsLoaded = (card: GameCardType, isLoaded: boolean) => {
        setCards((prevState) => {
            if (!prevState) return prevState;

            const updatedCards = prevState.map((updatedCard) => {
                if (card.uniqueId === updatedCard.uniqueId) {
                    return { ...updatedCard, isLoaded };
                }
                return updatedCard;
            });
            return updatedCards;
        });
    };

    const deactivateAllCards = () => {
        setCards((prevState) => {
            if (!prevState) return prevState;

            const updatedCards = prevState.map((updatedCard) => {
                return { ...updatedCard, isActive: false };
            });
            return updatedCards;
        });
    };

    const sortCards = (result: DropResult) => {
        if (!result.destination) return;
        if (result.destination.index === result.source.index) return;

        const sortedCards = [...cards]
        const [removed] = sortedCards.splice(result.source.index, 1);
        sortedCards.splice(result.destination.index, 0, removed);

        setCards(sortedCards);
    };

    return (
        <GameCardContext.Provider value={{ cards, setCards, setIsDraggable, setIsActive, setIsHidden, setIsFocused, setCanPop, setCanFlip, setIsLoaded, deactivateAllCards, sortCards }}>
            {children}
        </GameCardContext.Provider>
    );
}

export default GameCardContext;