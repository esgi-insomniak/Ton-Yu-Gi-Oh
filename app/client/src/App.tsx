import Router from './Routes/Router';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SocketContextProvider } from '@/helpers/providers/socket/SocketProvider';
import { TrackingProvider } from 'insomniak-sdk-analytics'

function App() {
  const queryClient = new QueryClient()
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <TrackingProvider appId=''>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </TrackingProvider>
      </QueryClientProvider>
    </div>
  )
}

export default App
