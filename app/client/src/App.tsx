import Router from './Routes/Router';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { UserContextProvider } from '@/helpers/providers/users/usersProvider';
import { TrackingProvider } from 'insomniak-sdk-analytics'
import { ModalProvider } from '@/helpers/providers/modal';

function App() {
  const queryClient = new QueryClient()
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <TrackingProvider>
          <ModalProvider>
            <UserContextProvider>
              <BrowserRouter>
                <Router />
              </BrowserRouter>
            </UserContextProvider>
          </ModalProvider>
        </TrackingProvider>
      </QueryClientProvider>
    </div>
  )
}

export default App
