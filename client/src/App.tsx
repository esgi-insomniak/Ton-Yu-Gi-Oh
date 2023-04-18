import Router from './Routes/Router';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { UserContextProvider } from '@/helpers/providers/users/usersProvider';
// @ts-ignore
import { TrackingProvider } from '@inso/sdk'

function App() {
  const queryClient = new QueryClient()
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <TrackingProvider>
            <BrowserRouter>
              <Router />
            </BrowserRouter>
          </TrackingProvider>
        </UserContextProvider>
      </QueryClientProvider>
    </div>
  )
}

export default App
