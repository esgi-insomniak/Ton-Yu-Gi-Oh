import Router from './Routes/Router';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { UserContextProvider } from '@/helpers/providers/users/usersProvider';
import { TrackingProvider } from 'insomniak-sdk-analytics'

function App() {
  const queryClient = new QueryClient()
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <TrackingProvider appId='64997e19553c06bf54987458'>
          <UserContextProvider>
            <BrowserRouter>
              <Router />
            </BrowserRouter>
          </UserContextProvider>
        </TrackingProvider>
      </QueryClientProvider>
    </div>
  )
}

export default App
