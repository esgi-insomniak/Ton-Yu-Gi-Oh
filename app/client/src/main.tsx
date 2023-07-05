import './index.css'
import ReactDOM from 'react-dom/client'
import App from './App'
import React from 'react'
import { AlertInso, AlertProvider } from '@/helpers/providers/alerts/AlertProvider'
import { SocketContextProvider } from './helpers/providers/socket/SocketProvider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <AlertProvider>
            <SocketContextProvider>
                <React.Fragment>
                    <App />
                    <AlertInso />
                </React.Fragment>
            </SocketContextProvider>
        </AlertProvider>
    </React.StrictMode>
)
