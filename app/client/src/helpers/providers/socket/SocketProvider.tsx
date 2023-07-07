import React from "react";
import { SocketContext } from "@/helpers/context/socket/SocketContext";
import { Socket, io } from "socket.io-client";
import { SOCKET_URL } from "@/helpers/utils/constants";
import { SocketContextProps } from "@/helpers/types/users";
import { ISocketEvent, ISocketEventType } from "@/helpers/types/socket";
import { useAlert } from "../alerts/AlertProvider";
import { useToken } from "@/helpers/api/hooks/auth";
// import { useNavigate } from "react-router-dom";

export const SocketContextProvider = ({ children }: SocketContextProps) => {

    const ioClient = React.useRef<Socket | null>(null);
    const token = useToken();
    const alert = useAlert();
    // const navigate = useNavigate();
    React.useEffect(() => {
        if (token) {
            if (ioClient.current === null) {
                const socket = io(SOCKET_URL, { path: '/socket.io', auth: { token: `Bearer ${token}` } });
                socket.off('auction__created')
                socket.off('exchange__request')
                socket.off('duel__is_started')
                socket.off('duel__canceled')

                socket.on('auction__created', (event: ISocketEvent) => {
                    alert?.success(`Une nouvelle enchère a été créée !`)
                })
                socket.on('exchange__request', (event: ISocketEvent) => {
                    if (event.type === ISocketEventType.INFO) {
                        alert?.success(`${event.data.exchangeOwner.username} vous propose un échange !`)
                    }
                })
                socket.on('duel__is_started', (event: ISocketEvent) => {
                    if (event.type === ISocketEventType.INFO) {
                        // event.data.hasStarted ? navigate(`/duel/select-deck/${event.data.roomId}`) : navigate(`/duel/${event.data.roomId}}`)
                    }
                })
                socket.on('duel__canceled', (event: ISocketEvent) => {
                    if (event.type === ISocketEventType.INFO) {
                        alert?.error(`Le duel a été annulé 😥`)
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