// create a context for user management
import React from 'react';
import { UserContextType } from '../../types/users';

export const initialUserContext = {
    token: "",
    isLoggedIn: false,
    setUser: (user: UserContextType, token: string) => { },
    user: {
        id: "",
        email: "",
        role: "",
        username: "",
    }
}

export const UserContext = React.createContext<typeof initialUserContext>(initialUserContext);

export const UserContextConsumer = UserContext.Consumer;