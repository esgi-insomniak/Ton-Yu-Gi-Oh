import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import cardsJson from './assets/cards.json'
import GameCard from './components/GameCard'
import { CardAttribute, CardFrameType, CardRace, CardRarity, CardType } from './types/GameCard'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

function App() {
  const [count, setCount] = useState(0)
  const [cards, setCards] = useState<Array<any>>([])

  useEffect(() => {
    const filteredCards = cardsJson.filter((card, index, self) => {
      return self.findIndex(c => card.card_sets !== undefined && c.card_sets !== undefined && c.card_sets[0].set_rarity === card.card_sets[0].set_rarity) === index
    })
    setCards(filteredCards)
  }, [])

  const reorder = (list, startIndex, endIndex) => {
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
        <Droppable droppableId="frame_test">
          {provider => (
            <div {...provider.droppableProps} ref={provider.innerRef}>
              {cards.map((card, index) => (
                <>
                  <h2>{card.card_sets[0].set_rarity.replace(/\W/g, '-').toLowerCase()}</h2>
                  <GameCard
                    key={index}
                    uniqueId={index}
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
                    canBeDragged={true}
                  />
                </>
              ))
              }
              {provider.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default App
