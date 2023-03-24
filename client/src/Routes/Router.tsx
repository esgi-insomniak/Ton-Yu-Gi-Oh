import React from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = ({ redirect, condition, children }: any) => {
    return condition ? children : <Navigate to={redirect} />;
}

/**
 * 
 * @returns Render the routes based on the condition (ex: if user is logged in or not) and redirect to error page if condition is false
 */
const Router = () => {

    const HomePage = React.lazy(() => import('../pages/Home'));
    const DisplayCards = React.lazy(() => import('../pages/DisplayCards'));
    const ErrorPage = React.lazy(() => import('../pages/ErrorPage'));

    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route
                    element={
                        <ProtectedRoute
                            condition={false}
                            redirect="/error"
                        >
                            <Outlet />
                        </ProtectedRoute>
                    }
                >
                    <Route path="/display-cards" element={<DisplayCards />} />
                </Route>
                <Route path="/" element={<HomePage />} />
                <Route path="/error" element={<ErrorPage />} />
            </Routes>
        </React.Suspense>
    );
};

export default Router;