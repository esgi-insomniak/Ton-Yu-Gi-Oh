import React from "react";
import { UserContext } from "@/helpers/context/users/UserManagement";
import { DecodedTokenType, UserContextType, UserManagementContextProps } from "@/helpers/types/users";
import { ROLES } from "@/helpers/utils/enum/roles";
import jwt_decode from "jwt-decode"
import { useLocalStorage } from "react-use";
import { Socket, io } from "socket.io-client";
import { SOCKET_URL } from "@/helpers/utils/constants";

export const UserContextProvider = ({ children }: UserManagementContextProps) => {
    const [tokenLs, setToken, removeToken] = useLocalStorage("token", "", { raw: true });
    const token = tokenLs || "";
    const defaultUser = React.useMemo(() => {
        if (tokenLs) {
            const decodedToken = jwt_decode<DecodedTokenType>(tokenLs);
            return {
                id: decodedToken.userId,
                email: decodedToken.email,
                roles: decodedToken.roles,
                username: decodedToken.username,
            }
        }
        return { id: "", email: "", roles: [ROLES.USER], username: "" }
    }, [tokenLs])
    const [user, setUser] = React.useState<UserContextType>(defaultUser);
    const [ioClient, setIoClient] = React.useState<Socket | null>(null);

    const handleUpdateUser = React.useCallback((token: string) => {
        setToken(token);
        const decodedToken = jwt_decode<DecodedTokenType>(token);
        setUser({
            id: decodedToken.userId,
            email: decodedToken.email,
            roles: decodedToken.roles,
            username: decodedToken.username,
        })
    }, [setUser])

    const logout = React.useCallback(() => {
        removeToken();
        setUser({ id: "", email: "", roles: [ROLES['USER']], username: "" })
        localStorage.clear();
    }, [setUser])

    React.useEffect(() => {
        ioClient?.disconnect();
        if(!tokenLs) return;
        setIoClient(io(SOCKET_URL, { path: '/socket.io', auth: { token: `Bearer ${tokenLs}` } }));
    }, [tokenLs])

    const value = React.useMemo(() => ({
        token,
        isLoggedIn: user.id !== "",
        user,
        ioClient,
        login: handleUpdateUser,
        logout
    }), [token, user, handleUpdateUser])

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}