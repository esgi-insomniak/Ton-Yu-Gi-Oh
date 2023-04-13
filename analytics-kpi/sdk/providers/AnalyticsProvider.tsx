import React, { createContext, ReactNode, RefObject, useRef } from 'react';
import { useTrackEvent, useMouseTrack, ScreenSizeType, MousePosition } from '../hooks';
import createAnalyticsSDK from '../services/AnalyticsSDK';

interface AnalyticsContextValue {
    trackEvent: (event: string, payload?: Record<string, unknown>) => void;
    mousePosition: MousePosition;
}

interface AnalyticsProviderProps {
    children: ReactNode;
    appId: string;
}

export const AnalyticsContext = createContext<AnalyticsContextValue>({
    trackEvent: () => { },
    mousePosition: { x: -1, y: -1, screenSize: 'md' },
});

function AnalyticsProvider({ children, appId }: AnalyticsProviderProps) {
    const trackEventRef = useRef<(event: string, payload?: Record<string, unknown>) => void>(() => { });
    const [mousePosition] = useMouseTrack();

    React.useEffect(() => {
        const analyticsSDK = createAnalyticsSDK(appId);
        trackEventRef.current = analyticsSDK.track;
    }, [appId]);

    const trackEvent = React.useCallback((event: string, payload?: Record<string, unknown>) => {
        trackEventRef.current(event, payload);
    }, []);

    const value = React.useMemo(() => ({ trackEvent, mousePosition }), [trackEvent, mousePosition]);

    return (
        <AnalyticsContext.Provider value={value}>
            {children}
        </AnalyticsContext.Provider>
    );
}

export default AnalyticsProvider;
