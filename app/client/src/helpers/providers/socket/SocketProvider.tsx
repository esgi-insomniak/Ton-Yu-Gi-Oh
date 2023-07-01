import React from "react";
import { SocketContext } from "@/helpers/context/socket/SocketContext";
import { Socket, io } from "socket.io-client";
import { SOCKET_URL } from "@/helpers/utils/constants";
import { getToken } from "@/helpers/api";
import { SocketContextProps } from "@/helpers/types/users";
import { ISocketEvent, ISocketEventType } from "@/helpers/types/socket";
import { useAlert } from "../alerts/AlertProvider";

export const SocketContextProvider = ({ children }: SocketContextProps) => {

    const [ioClient, setIoClient] = React.useState<Socket | null>(null);
    const alert = useAlert();

    const memoizedIoClient = React.useMemo(() => {
        if (getToken()) {
            if (ioClient === null) setIoClient(io(SOCKET_URL, { path: '/socket.io', auth: { token: `Bearer ${getToken()}` } }));
        } else if (ioClient !== null) {
            ioClient?.disconnect();
            setIoClient(null);
        }

        ioClient?.off('exchange__request')
        ioClient?.on('exchange__request', (event: ISocketEvent) => {
            if (event.type === ISocketEventType.INFO) {
                alert?.success(`${event.data.exchangeOwner.username} vous propose un échange !`)
            }
        })

        return ioClient;
    }, [getToken, ioClient])

    return (
        <SocketContext.Provider value={{ ioClient: memoizedIoClient }}>
            {children}
        </SocketContext.Provider>
    )
}