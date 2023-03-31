// create a context for user management
import React from 'react';
import { UserContextType } from '@/helpers/types/users';

export const initialUserContext = {
    token: "",
    isLoggedIn: false,
    handleUpdateUser: (token: string) => { },
    user: {
        id: "",
        email: "",
        roles: [""],
        username: "",
    }
}

export const UserContext = React.createContext<typeof initialUserContext>(initialUserContext);

export const UserContextConsumer = UserContext.Consumer;