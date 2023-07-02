import React from "react";
import { generateId } from '../common';

type TrackingContextType = {
    visitorId: string;
    appId: string;
};

const TrackingContext = React.createContext<TrackingContextType>({
    visitorId: '',
    appId: '',
});

const TrackingProvider = ({ children, appId }: { children: React.ReactNode, appId: string }) => {

    const visitorId = React.useMemo<string>(() => {
        const localStorageClientId = localStorage.getItem('clientId');
        if (localStorageClientId) return localStorageClientId;
        else {
            const newClientId = generateId('client');
            localStorage.setItem('clientId', newClientId);
            return newClientId;
        }
    }, []);

    const trackingContext = React.useMemo<TrackingContextType>(() => {
        return { visitorId, appId }
    }, [visitorId, appId]);

    return (
        <TrackingContext.Provider value={trackingContext}>
            {children}
        </TrackingContext.Provider>
    );
};


const useTrackingContext = () => {
    const context = React.useContext(TrackingContext);
    if (context === undefined) {
        throw new Error("useTrackingContext must be used within a TrackingProvider");
    }
    return context;
};

export { TrackingProvider, useTrackingContext };