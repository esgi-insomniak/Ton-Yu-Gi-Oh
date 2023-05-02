import React from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/helpers/api/hooks";

interface ProtectedRouteProps {
    redirect: string;
    condition: boolean;
    children: React.ReactNode;
}

const ProtectedRoute = ({ redirect, condition, children }: ProtectedRouteProps) => {
    if (condition) return <React.Fragment>{children}</React.Fragment>
    else return <Navigate to={redirect} />;
};

const ErrorPage = React.lazy(() => import('@/pages/Errors/ErrorPage'));
const LoginPage = React.lazy(() => import('@/pages/Auth/Login'));
const LogoutPage = React.lazy(() => import('@/pages/Auth/Logout'));
const Register = React.lazy(() => import('@/pages/Auth/Register'));

/**
 * @returns Render the routes based on the condition (ex: if user is logged in or not) and redirect to error page if condition is false
 */
const Router: React.FC = () => {
    const { user, isLoggedIn } = useAuth()

    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <Routes>

                <Route
                    element={
                        <ProtectedRoute
                            condition={isLoggedIn}
                            redirect="/login"
                        >
                            <Outlet />
                        </ProtectedRoute>
                    }
                >
                    <Route path="/" element={<div>Dashboard</div>} />
                </Route>

                <Route
                    element={
                        <ProtectedRoute
                            condition={!isLoggedIn}
                            redirect="/"
                        >
                            <Outlet />
                        </ProtectedRoute>
                    }
                >
                    <Route path="/login" element={<LoginPage />} />
                </Route>
                <Route path="/register" element={<Register />} />
                <Route path="/logout" element={<LogoutPage />} />
                <Route path="/error" element={<ErrorPage />} />

            </Routes>
        </React.Suspense>
    );
};

export default Router;