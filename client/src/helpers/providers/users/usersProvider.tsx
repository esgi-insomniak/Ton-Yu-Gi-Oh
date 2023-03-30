import React from "react";
import { UserContext } from "@/helpers/context/users/UserManagement";
import { UserContextType, UserManagementContextProps } from "@/helpers/types/users";
import { ROLES } from "@/helpers/utils/enum/roles";

export const UserContextProvider = ({ children }: UserManagementContextProps) => {

    const [token, setToken] = React.useState<string>("");
    const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
    const [user, setUser] = React.useState<UserContextType>({
        id: "",
        email: "",
        role: ROLES.ANONYMOUS,
        username: "",
    });

    const handleUpdateUser = React.useCallback((user: UserContextType, token: string) => {
        setUser(user);
        setToken(token);
        setIsLoggedIn(true);
    }, [setIsLoggedIn, setToken])

    const value = React.useMemo(() => ({
        token,
        isLoggedIn,
        user,
        setUser: handleUpdateUser
    }),
        [
            token,
            isLoggedIn,
            user,
            handleUpdateUser
        ]
    )

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}