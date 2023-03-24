import { GameCardProvider } from './helpers/context/GameCardContext'
import Router from './Routes/Router';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <GameCardProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </GameCardProvider>
    </div>
  )
}

export default App
