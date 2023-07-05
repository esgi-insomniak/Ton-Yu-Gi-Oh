import { Socket } from 'socket.io-client';
import React from 'react';

export const initialSocketContext = {
    ioClient: null as Socket | null,
    getIoClient: (): Socket | null => { return null as Socket | null },
}

export const SocketContext = React.createContext(initialSocketContext);

export const SocketContextConsumer = SocketContext.Consumer;