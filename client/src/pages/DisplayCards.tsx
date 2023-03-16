import React from "react"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import { CardAttribute, CardFrameType, GameCardType, CardRace, CardRarity, CardType } from "../components/GameCard/index.d"
import GameCard from "../components/GameCard/GameCard"
import cardsJson from '../assets/cards.json'
import GameCardContext from "../helpers/context/GameCardContext"
import { v4 as uuidv4 } from "uuid"

const DisplayCards = () => {
    const { cards, setCards, sortCards } = React.useContext(GameCardContext)

    React.useEffect(() => {
        if (cards.length !== 0) return;

        const filteredCards = Object.values(cardsJson).filter((card) => {
            if (card.card_sets !== undefined)
                return card;
        }).map((card) => {
            return {
                uniqueId: uuidv4(),
                id: card.id,
                name: card.name,
                name_en: card.name_en,
                type: Object.values(CardType).find(type => type === card.type) as CardType,
                frameType: Object.values(CardFrameType).find(frameType => frameType === card.frameType) as CardFrameType,
                rarity: Object.values(CardRarity).find(rarity => rarity === card.card_sets[0].set_rarity) as CardRarity,
                attribute: Object.values(CardAttribute).find(attribute => attribute === card.attribute) as CardAttribute,
                setCode: card.card_sets[0].set_code,
                race: Object.values(CardRace).find(race => race === card.race) as CardRace,
                level: card.level,
                atk: card.atk,
                def: card.def,
                image_small: card.card_images[0].image_url_small,
                image_large: card.card_images[0].image_url,
                isDraggable: true,
                isActive: false,
                isHidden: card.id === 37478723,
                isFocused: false,
                canPop: true,
                canFlip: true
            } as GameCardType
        })

        setCards(filteredCards.slice(0, 10))
    }, [cards.length])

    return (
        <DragDropContext onDragEnd={sortCards}>
            <Droppable droppableId="drop_test">
                {dropProvided => (
                    <div {...dropProvided.droppableProps} ref={dropProvided.innerRef}>
                        {cards.map((card, index) => (
                            <div key={index}>
                                <h2>{card.rarity.replace(/\W/g, '-').toLowerCase()}</h2>
                                <Draggable key={card.id} draggableId={card.id.toString()} index={index} isDragDisabled={!card.isDraggable}>
                                    {dragProvided => (
                                        <div ref={dragProvided.innerRef} {...dragProvided.draggableProps}>
                                            <GameCard {...card} dragProvided={dragProvided} />
                                        </div>
                                    )}
                                </Draggable>
                            </div>
                        ))}
                        {dropProvided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}

export default DisplayCards