import React from 'react';
import { GameCardContextProps } from '../../types/cards';

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

export default GameCardContext;