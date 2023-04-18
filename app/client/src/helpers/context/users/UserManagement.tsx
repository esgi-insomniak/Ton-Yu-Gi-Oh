// create a context for user management
import React from 'react';

export const initialUserContext = {
    token: "",
    isLoggedIn: false,
    login: (token: string) => { },
    logout: () => { },
    user: {
        id: "",
        email: "",
        roles: [""],
        username: "",
    }
}

export const UserContext = React.createContext(initialUserContext);

export const UserContextConsumer = UserContext.Consumer;