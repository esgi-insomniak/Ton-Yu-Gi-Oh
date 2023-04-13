import React from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    redirect: string;
    condition: boolean;
    children: React.ReactNode;
}

const ProtectedRoute = ({ redirect, condition, children }: ProtectedRouteProps) => {
    if (condition) return <React.Fragment>{children}</React.Fragment>
    else return <Navigate to={redirect} />;
};

/**
 * @returns Render the routes based on the condition (ex: if user is logged in or not) and redirect to error page if condition is false
 */
const Router: React.FC = () => {

    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route
                    element={
                        <ProtectedRoute
                            condition={true}
                            redirect="/login"
                        >
                            <Outlet />
                        </ProtectedRoute>
                    }
                >
                    <Route path="/" element={<div>Dashboard</div>} />
                </Route>
                <Route path="/error" element={<div>Error Page</div>} />
                <Route path="/login" element={<div>Login</div>} />
                <Route path="/logout" element={<div>Logout</div>} />
            </Routes>
        </React.Suspense>
    );
};

export default Router;