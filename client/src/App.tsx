import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import cardsJson from './assets/cards.json'
import GameCard from './components/GameCard'
import { CardAttribute, CardFrameType, CardRace, CardRarity, CardType } from './types/GameCard'
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

function App() {
  const [count, setCount] = useState(0)
  const [cards, setCards] = useState<Array<any>>([])

  useEffect(() => {
    if (cards.length === 0) {
      const filteredCards = Object.values(cardsJson).filter((card, index, self) => {
        if (card.card_sets !== undefined)
          return cards;
      })
      setCards(filteredCards.slice(0, 10))
    }
  }, [cards.length])

  const reorder = (list: Array<any>, startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const sortCards = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      cards,
      result.source.index,
      result.destination.index
    );

    setCards(items);
  };

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <DragDropContext onDragEnd={sortCards}>
        <Droppable droppableId="drop_test">
          {dropProvided => (
            <div {...dropProvided.droppableProps} ref={dropProvided.innerRef}>
              {cards.map((card, index) => (
                <>
                  <h2>{card.card_sets[0].set_rarity.replace(/\W/g, '-').toLowerCase()}</h2>
                  <Draggable key={card.id} draggableId={card.id.toString()} index={index} isDragDisabled={true}>
                    {dragProvided => (
                      <div ref={dragProvided.innerRef} {...dragProvided.draggableProps}>
                        <GameCard
                          key={index}
                          id={card.id}
                          name={card.name}
                          name_en={card.name_en}
                          type={Object.values(CardType).find(type => type === card.type) as CardType}
                          frameType={Object.values(CardFrameType).find(type => type === card.frameType) as CardFrameType}
                          rarity={Object.values(CardRarity).find(rarity => rarity === card.card_sets[0].set_rarity) as CardRarity}
                          setCode={card.card_sets[0].set_code}
                          attribute={Object.values(CardAttribute).find(attribute => attribute === card.attribute) as CardAttribute}
                          race={Object.values(CardRace).find(race => race === card.race) as CardRace}
                          level={card.level}
                          atk={card.atk}
                          def={card.def}
                          image_small={card.card_images[0].image_url_small}
                          image_large={card.card_images[0].image_url}
                          dragProvided={dragProvided}
                          isDragDisabled={true}
                        />
                      </div>
                    )}
                  </Draggable>
                </>
              ))}
              {dropProvided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default App
