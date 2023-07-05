import Router from './Routes/Router';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider, QueryErrorResetBoundary } from 'react-query';
import { TrackingProvider } from 'insomniak-sdk-analytics'
import { ErrorBoundary } from 'react-error-boundary'

function App() {
  const queryClient = new QueryClient()

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              fallbackRender={({ error, resetErrorBoundary }) => {
                console.log(error)
                if (error?.status === 401) {
                  console.log('error 401')
                }
                return (
                  <div>
                    There was an error!
                    <button className='btn' onClick={() => resetErrorBoundary()}>Try again</button>
                  </div>
                )
              }}>
              <TrackingProvider appId=''>
                <BrowserRouter>
                  <Router />
                </BrowserRouter>
              </TrackingProvider>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </QueryClientProvider>
    </div >
  )
}

export default App
