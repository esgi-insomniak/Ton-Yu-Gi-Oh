import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import GameCard from './components/GameCard'
import cards from './assets/cards-yu-gi-oh.json'
import { CardAttribute, CardFrameType, CardRace, CardRarity, CardType } from './types/GameCard'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

function App() {
  const [count, setCount] = useState(0)

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
      <DragDropContext onDragEnd={() => { console.log('test') }}>
        <Droppable droppableId={"idx_54fdsg64"}>
          {provider => (
            <div {...provider.droppableProps} ref={provider.innerRef}>
              <GameCard
                id={10000}
                name={'Dragon Dix-Mille'}
                name_en={'Ten Thousand Dragon'}
                type={CardType.EFFECT_MONSTER}
                frameType={CardFrameType.EFFECT}
                rarity={CardRarity._10000_SECRET_RARE}
                setCode={"BLAR-EN10K"}
                attribute={CardAttribute.DARK}
                race={CardRace.DRAGON}
                level={10}
                atk={0}
                def={0}
                images={{
                  image_url: 'https://images.ygoprodeck.com/images/cards/10000.jpg',
                  image_url_small: 'https://images.ygoprodeck.com/images/cards_small/10000.jpg'
                }} />
              <GameCard
                id={39343610}
                name={'Dragon du Brasier Sombre'}
                name_en={'Darkblaze Dragon'}
                type={CardType.EFFECT_MONSTER}
                frameType={CardFrameType.EFFECT}
                rarity={CardRarity.COMMON}
                setCode={"BLAR-EN10K"}
                attribute={CardAttribute.FIRE}
                race={CardRace.DRAGON}
                level={7}
                atk={1200}
                def={1000}
                images={{
                  image_url: 'https://images.ygoprodeck.com/images/cards/39343610.jpg',
                  image_url_small: 'https://images.ygoprodeck.com/images/cards_small/39343610.jpg'
                }} />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default App
