// create a context for user management
import { Socket } from 'socket.io-client';
import { ROLES } from '@/helpers/utils/enum/roles';
import React from 'react';

export const initialUserContext = {
    token: "",
    isLoggedIn: false,
    login: (token: string) => { },
    logout: () => { },
    ioClient: null as Socket | null,
    user: {
        id: "",
        email: "",
        roles: [ROLES.USER],
        username: "",
    }
}

export const UserContext = React.createContext(initialUserContext);

export const UserContextConsumer = UserContext.Consumer;