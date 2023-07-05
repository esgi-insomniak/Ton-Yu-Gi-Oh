import React from "react";
import { SocketContext } from "@/helpers/context/socket/SocketContext";
import { Socket, io } from "socket.io-client";
import { SOCKET_URL } from "@/helpers/utils/constants";
import { SocketContextProps } from "@/helpers/types/users";
import { ISocketEvent, ISocketEventType } from "@/helpers/types/socket";
import { useAlert } from "../alerts/AlertProvider";
import { useToken } from "@/helpers/api/hooks/auth";

export const SocketContextProvider = ({ children }: SocketContextProps) => {

    const ioClient = React.useRef<Socket | null>(null);
    const token = useToken();
    const alert = useAlert();
    React.useEffect(() => {
        if (token) {
            if (ioClient.current === null) {
                const socket = io(SOCKET_URL, { path: '/socket.io', auth: { token: `Bearer ${token}` } });
                socket.off('exchange__request')
                socket.on('exchange__request', (event: ISocketEvent) => {
                    console.log(event)
                    if (event.type === ISocketEventType.INFO) {
                        alert?.success(`${event.data.exchangeOwner.username} vous propose un échange !`)
                    }
                })
                ioClient.current = socket;
            }
        } else {
            if (ioClient !== null) {
                ioClient.current?.disconnect();
                ioClient.current = null;
            }
        }
        return () => {
            ioClient.current?.disconnect();
            ioClient.current = null;
        }
    }, [token, ioClient])

    const getIoClient = () => {
        return ioClient.current;
    }

    return (
        <SocketContext.Provider value={{ ioClient: ioClient.current, getIoClient }}>
            {children}
        </SocketContext.Provider>
    )
}