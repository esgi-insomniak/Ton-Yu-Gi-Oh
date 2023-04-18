import React from "react";
import { generateId } from "../common";

type TrackingContextType = {
    clientId: string;
    appId: string;
};

const TrackingContext = React.createContext<TrackingContextType>({ clientId: "", appId: "" });

const TrackingProvider = ({ children }: { children: React.ReactNode }) => {

    const trackingContext = React.useMemo(() => {
        return {
            clientId: localStorage.getItem("clientId") || generateId('clientId'),
            appId: localStorage.getItem("appId") || generateId('appId'),
        };
    }, []);

    React.useEffect(() => {
        localStorage.setItem("clientId", trackingContext.clientId);
        localStorage.setItem("appId", trackingContext.appId);
    }, [trackingContext]);

    return <TrackingContext.Provider value={trackingContext}>{children}</TrackingContext.Provider>;
};

const useTrackingContext = () => {
    const context = React.useContext(TrackingContext);
    if (context === undefined) {
        throw new Error("useTrackingContext must be used within a TrackingProvider");
    }
    return context;
};

export { TrackingProvider, useTrackingContext };
