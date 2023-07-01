import React from "react";
import { SocketContext } from "@/helpers/context/socket/SocketContext";

export const useSocket = () => React.useContext(SocketContext)