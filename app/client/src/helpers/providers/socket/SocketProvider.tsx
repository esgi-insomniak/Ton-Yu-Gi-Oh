import React from "react";
import { SocketContext } from "@/helpers/context/socket/SocketContext";
import { Socket, io } from "socket.io-client";
import { SOCKET_URL } from "@/helpers/utils/constants";
import { getToken } from "@/helpers/api";
import { SocketContextProps } from "@/helpers/types/users";

export const SocketContextProvider = ({ children }: SocketContextProps) => {

    const [ioClient, setIoClient] = React.useState<Socket | null>(null);

    const memoizedIoClient = React.useMemo(() => {
        if (getToken()) {
            if (ioClient === null) setIoClient(io(SOCKET_URL, { path: '/socket.io', auth: { token: `Bearer ${getToken()}` } }));
        } else if (ioClient !== null) {
            ioClient?.disconnect();
            setIoClient(null);
        }
        return ioClient;
    }, [getToken, ioClient])

    return (
        <SocketContext.Provider value={{ ioClient: memoizedIoClient }}>
            {children}
        </SocketContext.Provider>
    )
}