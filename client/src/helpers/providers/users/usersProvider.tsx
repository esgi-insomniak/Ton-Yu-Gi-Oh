import React from "react";
import { UserContext } from "@/helpers/context/users/UserManagement";
import { DecodedTokenType, UserContextType, UserManagementContextProps, UserType } from "@/helpers/types/users";
import { ROLES } from "@/helpers/utils/enum/roles";
import jwt_decode from "jwt-decode"

export const UserContextProvider = ({ children }: UserManagementContextProps) => {

    const [token, setToken] = React.useState<string>("");
    const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
    const [user, setUser] = React.useState<UserContextType>({
        id: "",
        email: "",
        roles: [ROLES.USER],
        username: "",
    });

    const handleUpdateUser = React.useCallback((token: string) => {
        setToken(token);
        setIsLoggedIn(true);
        const decodedToken = jwt_decode<DecodedTokenType>(token);
        setUser({
            id: decodedToken.userId,
            email: decodedToken.email,
            roles: decodedToken.roles,
            username: decodedToken.username,
        })
    }, [setIsLoggedIn, setToken, setUser])

    const value = React.useMemo(() => ({
        token,
        isLoggedIn,
        user,
        handleUpdateUser
    }), [token, isLoggedIn, user, handleUpdateUser])

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}