import Router from './Routes/Router';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { UserContextProvider } from '@/helpers/providers/users/usersProvider';
import AnalyticsProvider from '../../analytics-kpi/sdk/providers/AnalyticsProvider';

function App() {
  const queryClient = new QueryClient()
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <AnalyticsProvider appId="analytics-kpi">
          <UserContextProvider>
            <BrowserRouter>
              <Router />
            </BrowserRouter>
          </UserContextProvider>
        </AnalyticsProvider>
      </QueryClientProvider>
    </div>
  )
}

export default App
