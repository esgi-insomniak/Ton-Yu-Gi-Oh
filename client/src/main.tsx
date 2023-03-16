import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import App from './App'
import './index.css'

import Home from "./pages/Home";
import DisplayCards from "./pages/DisplayCards";
import ErrorPage from "./pages/ErrorPage";
import {GameCardProvider} from "./helpers/context/GameCardContext";

const BrowserRouter = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        errorElement: <ErrorPage />
    },
    {
        path: 'cards',
        element: (
            <GameCardProvider>
                <DisplayCards />
            </GameCardProvider>
        )
    }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <RouterProvider router={BrowserRouter}>
        <App />
    </RouterProvider>
)
