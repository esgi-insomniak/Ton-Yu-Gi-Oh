import React from "react";
import { useLogin } from "../../api/hooks/auth";
import { UserContext } from "../../context/users/UserManagement";
import { UserManagementContextProps } from "../../types/users";
import { ROLES } from "../../utils/enum/roles";

export const UserContextProvider = ({ children }: UserManagementContextProps) => {
    const apiUrl = React.useMemo(() => process.env.VITE_NODE_ENV === "development" ? process.env.VITE_API_URL_DEV : process.env.VITE_API_URL_PROD, [process.env.VITE_NODE_ENV])
    const [role, setRole] = React.useState<string>(ROLES.ANONYMOUS);
    const [token, setToken] = React.useState<string>("");
    const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
    const { value: login_ } = useLogin()

    const login = React.useCallback(() => {
        if (login_) {
            setToken(login_)
            setIsLoggedIn(true)
        }
    }, [
        login_,
        setToken,
        setIsLoggedIn
    ])

    const logout = React.useCallback(() => { }, [])

    const user = React.useMemo(() => {
        return {
            id: "",
            email: "",
            role: "",
            username: "",
        }
    }, [])

    const value = React.useMemo(() => {
        login
        logout
        token
        isLoggedIn
        user
    },
        [
            login,
            logout,
            token,
            isLoggedIn,
            user
        ]
    )

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}
