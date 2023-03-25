// create a context for user management
import React from 'react';

export const initialUserContext = {
    token: "",
    login: () => { },
    logout: () => { },
    isLoggedIn: false,
    user: {
        id: "",
        email: "",
        role: "",
        username: "",
    }
}

export const UserContext = React.createContext<typeof initialUserContext>(initialUserContext);
