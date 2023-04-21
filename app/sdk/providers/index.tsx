import React from "react";
import { generateId } from '../common';

type TrackingContextType = {
    clientId: string;
    appId: string;
};

const TrackingContext = React.createContext<TrackingContextType>({
    clientId: '',
    appId: '',
});

const TrackingProvider = ({ children }: { children: React.ReactNode }) => {

    const clientId = React.useMemo<string>(() => {
        const localStorageClientId = localStorage.getItem('clientId');
        if (localStorageClientId) return localStorageClientId;
        else {
            const newClientId = generateId('client');
            localStorage.setItem('clientId', newClientId);
            return newClientId;
        }
    }, []);

    const appId = React.useMemo<string>(() => {
        const localStorageAppId = localStorage.getItem('appId');
        if (localStorageAppId) return localStorageAppId;
        else {
            const newAppId = generateId('app');
            localStorage.setItem('appId', newAppId);
            return newAppId;
        }
    }, []);

    const trackingContext = React.useMemo<TrackingContextType>(() => {
        return { clientId, appId }
    }, [clientId, appId]);

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
