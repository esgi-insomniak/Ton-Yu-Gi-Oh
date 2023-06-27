import React from "react";
import { Routes, Route, Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/helpers/api/hooks";
import { GameCardProvider } from "@/helpers/providers/cards/cardsProvider";
import Layout from "@/components/Layout";

interface ProtectedRouteProps {
    redirect: string;
    condition: boolean;
    children: React.ReactNode;
    withLayout?: boolean;
}

/**
 * This is a TypeScript React function that renders children if a condition is met, otherwise it
 * redirects to a specified route.
 * @param {ProtectedRouteProps}  - - `redirect`: the path to redirect to if the `condition` is false
 * @returns The `ProtectedRoute` component is being returned. If the `condition` prop is true, it will
 * render the `children` prop wrapped in a `React.Fragment`. If the `condition` prop is false, it will
 * render a `Navigate` component with the `to` prop set to the `redirect` prop.
 */
const ProtectedRoute = ({ redirect, condition, children, withLayout }: ProtectedRouteProps) => {
    if (condition) return withLayout ? <Layout>{children}</Layout> : <React.Fragment>{children}</React.Fragment>
    else return <Navigate to={redirect} />;
};

/* These lines of code are importing React components lazily. This means that the components will only
be loaded when they are actually needed, instead of being loaded all at once when the application
starts. This can improve the performance of the application by reducing the initial load time. The
`import()` function is used to dynamically import the components. */
const HomePage = React.lazy(() => import('@/pages/Home'));
const ErrorPage = React.lazy(() => import('@/pages/Errors/ErrorPage'));
const LoginPage = React.lazy(() => import('@/pages/Auth/Login'));
const LogoutPage = React.lazy(() => import('@/pages/Auth/Logout'));
const BoosterPage = React.lazy(() => import('@/pages/Booster'));
const RegisterPage = React.lazy(() => import('@/pages/Auth/Register'));
const ConfirmAccPage = React.lazy(() => import('@/pages/Auth/ConfirmAcc'));
const ResetPwdPage = React.lazy(() => import('@/pages/Auth/ResetPwd'));
const CollectionPage = React.lazy(() => import('@/pages/Collection'));
const ShopPage = React.lazy(() => import('@/pages/Shop'));
const DecksPage = React.lazy(() => import('@/pages/Decks'));
const NewDecksPage = React.lazy(() => import('@/pages/Decks/NewDeck'));
const EditDecksPage = React.lazy(() => import('@/pages/Decks/EditDeck'));
const DuelPage = React.lazy(() => import('@/pages/Duels'));

/**
 * @returns Render the routes based on the condition (ex: if user is logged in or not) and redirect to error page if condition is false
 */
const Router: React.FC = () => {
    const { user, isLoggedIn } = useAuth()
    const router = useLocation().pathname
    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <Routes>

                <Route
                    element={
                        <ProtectedRoute
                            condition={isLoggedIn}
                            redirect="/login"
                            withLayout={router !== '/'}
                        >
                            <Outlet />
                        </ProtectedRoute>
                    }
                >
                    <Route path="/" element={<HomePage />} />
                    <Route path="/opening" element={<BoosterPage />} />
                    <Route path="/collection" element={
                        <GameCardProvider>
                            <CollectionPage />
                        </GameCardProvider>
                    } />
                    <Route path="/shop" element={<ShopPage />} />
                    <Route path="/shop/:sessionId" element={<ShopPage />} />
                    <Route path="/decks" element={<DecksPage />} />
                    <Route path="/decks/new" element={<NewDecksPage />} />
                    <Route path="/decks/edit/:id" element={<EditDecksPage />} />
                    <Route path="/duel/:roomId" element={<DuelPage />} />
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
                    <Route path='/register' element={<RegisterPage />} />
                    <Route path='/account-confirmation/:token' element={<ConfirmAccPage />} />
                    <Route path='/password-reset' element={<ResetPwdPage />} />
                    <Route path='/password-reset/:token' element={<ResetPwdPage />} />
                </Route>

                <Route path="/logout" element={<LogoutPage />} />
                <Route path="/error" element={<ErrorPage />} />

            </Routes>
        </React.Suspense>
    );
};

export default Router;