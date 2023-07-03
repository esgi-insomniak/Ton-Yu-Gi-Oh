import React from "react";
import { Routes, Route, Outlet, Navigate, useLocation } from "react-router-dom";
import { GameCardProvider } from "@/helpers/providers/cards/cardsProvider";
import Layout from "@/components/Layout";
import { ROLES } from "@/helpers/utils/enum/roles";
import { LayoutAdmin } from "@/pages/Admin/Layout";
import { useMe } from "@/helpers/api/hooks/users";
import Loader from "@/components/Loader";
import { SocketContextProvider } from "@/helpers/providers/socket/SocketProvider";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

interface ProtectedRouteProps {
    redirect: string;
    condition: boolean;
    children: React.ReactNode;
    withLayout?: boolean;
    isLoading?: boolean;
}

/**
 * This is a TypeScript React function that renders children if a condition is met, otherwise it
 * redirects to a specified route.
 * @param {ProtectedRouteProps}  - - `redirect`: the path to redirect to if the `condition` is false
 * @returns The `ProtectedRoute` component is being returned. If the `condition` prop is true, it will
 * render the `children` prop wrapped in a `React.Fragment`. If the `condition` prop is false, it will
 * render a `Navigate` component with the `to` prop set to the `redirect` prop.
 */
const ProtectedRoute = ({ redirect, condition, children, withLayout, isLoading }: ProtectedRouteProps) => {
    if (isLoading) return <Loader />;
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
const BoosterPage = React.lazy(() => import('@/pages/Booster'));
const RegisterPage = React.lazy(() => import('@/pages/Auth/Register'));
const ConfirmAccPage = React.lazy(() => import('@/pages/Auth/ConfirmAcc'));
const ResetPwdPage = React.lazy(() => import('@/pages/Auth/ResetPwd'));
const CollectionPage = React.lazy(() => import('@/pages/Collection'));
const ShopPage = React.lazy(() => import('@/pages/Shop'));
const DecksPage = React.lazy(() => import('@/pages/Decks'));
const NewDecksPage = React.lazy(() => import('@/pages/Decks/NewDeck'));
//const EditDecksPage = React.lazy(() => import('@/pages/Decks/EditDeck'));
const AdminUserPage = React.lazy(() => import('@/pages/Admin/user'));
const AdminExchangePage = React.lazy(() => import('@/pages/Admin/exchange'));
const AdminPayementPage = React.lazy(() => import('@/pages/Admin/payement'));
const AdminAuthPage = React.lazy(() => import('@/pages/Admin/auth'));
const AdminPromoPage = React.lazy(() => import('@/pages/Admin/promos'));
const DuelPage = React.lazy(() => import('@/pages/Duels'));
const CreateDeckPage = React.lazy(() => import('@/pages/Decks/deck'));
const MyCardCollectionPage = React.lazy(() => import('@/pages/Decks/card'));
const ExchangePage = React.lazy(() => import('@/pages/Exchange'));
const UserProfilPage = React.lazy(() => import('@/pages/User'));
const ExchangeRoomPage = React.lazy(() => import('@/pages/Exchange/exchangeRoom'));

/**
 * @returns Render the routes based on the condition (ex: if user is logged in or not) and redirect to error page if condition is false
 */
const Router: React.FC = () => {
    const { me, isLoading } = useMe()
    const router = useLocation().pathname

    const routesWithoutLayout = React.useMemo(() => ['/', '/admin'], [])

    React.useEffect(() => {
        if (isLoading) return
    }, [isLoading])

    return (
        <React.Suspense fallback={<Loader />}>
            <Routes>

                {/* Protected routes */}
                <Route
                    element={
                        <ProtectedRoute
                            condition={!!me}
                            redirect="/login"
                            withLayout={!routesWithoutLayout.includes(router)}
                            isLoading={isLoading}
                        >
                            <SocketContextProvider>
                                <Outlet />
                            </SocketContextProvider>
                        </ProtectedRoute>
                    }
                >
                    <Route path="/" element={<HomePage />} />
                    <Route path="/opening" element={
                        <DndProvider backend={HTML5Backend}>
                            <BoosterPage />
                        </DndProvider>
                    } />
                    <Route path="/collection" element={
                        <GameCardProvider>
                            <CollectionPage />
                        </GameCardProvider>
                    } />
                    <Route path="/shop" element={<ShopPage />} />
                    <Route path="/shop/:sessionId" element={<ShopPage />} />
                    <Route path="/decks" element={<DecksPage />} />
                    <Route path="/decks/create" element={<CreateDeckPage />} />
                    <Route path="/decks/my-cards" element={
                        <GameCardProvider>
                            <MyCardCollectionPage />
                        </GameCardProvider>
                    } />
                    <Route path="/decks/new" element={<NewDecksPage />} />
                    {/* <Route path="/decks/edit/:id" element={<EditDecksPage />} /> */}
                    <Route path="/duel/:roomId" element={
                        <DndProvider backend={HTML5Backend}>
                            <DuelPage />
                        </DndProvider>
                    } />
                    <Route path="/exchange/:cardId" element={<ExchangePage />} />
                    <Route path="/exchange-room/:roomId" element={<ExchangeRoomPage />} />
                    <Route path="/me" element={<UserProfilPage />} />
                </Route>

                {/* Admin routes */}
                <Route element={
                    <ProtectedRoute
                        condition={me?.roles?.includes(ROLES.ADMIN)!}
                        redirect="/"
                        isLoading={isLoading}
                    >
                        <LayoutAdmin>
                            <Outlet />
                        </LayoutAdmin>
                    </ProtectedRoute>
                }>
                    <Route path="/admin" element={<AdminUserPage />} />
                    <Route path="/admin/exchange" element={<AdminExchangePage />} />
                    <Route path="/admin/payement" element={<AdminPayementPage />} />
                    <Route path="/admin/auth" element={<AdminAuthPage />} />
                    <Route path="/admin/promo" element={<AdminPromoPage />} />
                </Route>

                {/* Public routes */}
                <Route
                    element={
                        <ProtectedRoute
                            condition={me === undefined}
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


                <Route path="/error" element={<ErrorPage />} />

            </Routes>
        </React.Suspense>
    );
};

export default Router;
