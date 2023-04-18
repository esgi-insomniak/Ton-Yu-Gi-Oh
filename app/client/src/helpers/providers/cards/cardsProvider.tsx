import React from "react";
import { DropResult } from "react-beautiful-dnd";
import GameCardContext from "../../context/cards/GameCardContext";
import { GameCardType } from "../../types/cards";

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

    const value = React.useMemo(() => ({
        cards,
        setCards,
        setIsDraggable,
        setIsActive,
        setIsHidden,
        setIsFocused,
        setCanPop,
        setCanFlip,
        setIsLoaded,
        deactivateAllCards,
        sortCards
    }), [cards,
        setCards,
        setIsDraggable,
        setIsActive,
        setIsHidden,
        setIsFocused,
        setCanPop,
        setCanFlip,
        setIsLoaded,
        deactivateAllCards,
        sortCards]);

    return (
        <GameCardContext.Provider value={value}>
            {children}
        </GameCardContext.Provider>
    );
}