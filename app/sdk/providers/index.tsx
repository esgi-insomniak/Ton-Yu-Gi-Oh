import React from "react";
import { generateId } from "../common";

type TrackingContextType = {
    clientId: string;
    appId: string;
};

const TrackingContext = React.createContext<TrackingContextType>({ clientId: "", appId: "" });

const TrackingProvider = ({ children }: { children: React.ReactNode }) => {

    const trackingContext = React.useMemo(() => {
        const ls_clientId = localStorage.getItem("clientId");
        const ls_appId = localStorage.getItem("appId");
        return {
            clientId: !!ls_clientId ? ls_clientId : generateId('clientId'),
            appId: !!ls_appId ? ls_appId : generateId('appId')
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
