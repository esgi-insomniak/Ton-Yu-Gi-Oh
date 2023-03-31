import Router from './Routes/Router';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { UserContextProvider } from '@/helpers/providers/users/usersProvider';

function App() {
  const queryClient = new QueryClient()
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </UserContextProvider>
      </QueryClientProvider>
    </div>
  )
}

export default App
