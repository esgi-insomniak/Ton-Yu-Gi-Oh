import React from 'react';
import { IGameCardContextProps } from '@/helpers/types/cards';

const GameCardContext = React.createContext<IGameCardContextProps>({
    cardSets: [],
    setCardSets: () => { },
    setIsDraggable: () => { },
    setIsActive: () => { },
    setIsHidden: () => { },
    setIsFocused: () => { },
    setCanPop: () => { },
    setCanFlip: () => { },
    setCanActivate: () => { },
    setCanInteract: () => { },
    setIsLoaded: () => { },
    sortCardSets: () => { },
    deactivateAllCardSets: () => { }
});

export const useGameCard = () => React.useContext(GameCardContext);

export default GameCardContext;