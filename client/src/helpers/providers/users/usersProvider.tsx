import React from "react";
import { UserContext } from "@/helpers/context/users/UserManagement";
import { DecodedTokenType, UserContextType, UserManagementContextProps } from "@/helpers/types/users";
import { ROLES } from "@/helpers/utils/enum/roles";
import jwt_decode from "jwt-decode"
import { useCookies } from "react-cookie";

export const UserContextProvider = ({ children }: UserManagementContextProps) => {
    const [cookies, setCookies, removeCookies] = useCookies(["token"]);
    const token = cookies.token || "";
    const defaultUser = React.useMemo(() => {
        if (token) {
            const decodedToken = jwt_decode<DecodedTokenType>(token);
            return {
                id: decodedToken.userId,
                email: decodedToken.email,
                roles: decodedToken.roles,
                username: decodedToken.username,
            }
        }
        return { id: "", email: "", roles: [ROLES.USER], username: "" }
    }, [token])
    const [user, setUser] = React.useState<UserContextType>(defaultUser);

    const handleUpdateUser = React.useCallback((token: string) => {
        setCookies("token", token, { path: "/" });
        const decodedToken = jwt_decode<DecodedTokenType>(token);
        setUser({
            id: decodedToken.userId,
            email: decodedToken.email,
            roles: decodedToken.roles,
            username: decodedToken.username,
        })
    }, [setUser])

    const logout = React.useCallback(() => { }, [])

    const value = React.useMemo(() => ({
        token,
        isLoggedIn: user.id !== "",
        user,
        login: handleUpdateUser,
        logout
    }), [token, user, handleUpdateUser])

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}