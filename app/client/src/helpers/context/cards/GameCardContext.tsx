import React from 'react';
import { IGameCardContextProps } from '../../types/cards';

const GameCardContext = React.createContext<IGameCardContextProps>({
    cardSets: [],
    setCardSets: () => { },
    setIsDraggable: () => { },
    setIsActive: () => { },
    setIsHidden: () => { },
    setIsFocused: () => { },
    setCanPop: () => { },
    setCanFlip: () => { },
    setIsLoaded: () => { },
    sortCardSets: () => { },
    deactivateAllCardSets: () => { }
});

export default GameCardContext;