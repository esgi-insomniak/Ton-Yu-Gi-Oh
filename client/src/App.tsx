import './App.css'
import { GameCardProvider } from './helpers/context/GameCardContext'
import DisplayCards from './pages/DisplayCards'

function App() {
  return (
    <div className="App">
      <GameCardProvider>
        <DisplayCards />
      </GameCardProvider>
    </div>
  )
}

export default App
