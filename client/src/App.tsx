import { GameCardProvider } from './helpers/context/GameCardContext'
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <GameCardProvider>
        <Home />
      </GameCardProvider>
    </div>
  )
}

export default App
