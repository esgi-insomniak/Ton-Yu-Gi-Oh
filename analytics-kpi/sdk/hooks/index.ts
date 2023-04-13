import React, { useContext, useEffect, useRef, useState } from 'react';
import { AnalyticsContext } from '../providers/AnalyticsProvider';

interface MousePosition {
    x: number;
    y: number;
    screenSize: ScreenSizeType
}

export type ScreenSizeType = 'sm' | 'md' | 'lg' | 'xl';

type Props = {
    eventName: string;
    eventProperties?: Record<string, unknown>;
};

type TrackEventFn = (event: string, payload?: Record<string, unknown>) => void;

function useTrackEvent(): TrackEventFn {
    const { trackEvent } = useContext(AnalyticsContext);

    const eventRef = useRef<Props>({ eventName: '' });

    useEffect(() => {
        const handleClick = () => {
            trackEvent(eventRef.current.eventName, eventRef.current.eventProperties);
        };
        if (eventRef.current.eventName) {
            const node = eventRef as unknown as React.RefObject<HTMLElement>;
            node.current?.addEventListener('click', handleClick);
            return () => node.current?.removeEventListener('click', handleClick);
        }
    }, [trackEvent]);

    return (eventName: string, eventProperties?: Record<string, unknown>) => {
        eventRef.current = { eventName, eventProperties };
    }
}

const useMouseTrack = (
    screenSize: ScreenSizeType = 'md'
): [MousePosition] => {
    const [mouseTrackData, setMouseTrackData] = useState<MousePosition>({
        x: -1,
        y: -1,
        screenSize,
    });

    useEffect(() => {
        const trackMouse = (event: MouseEvent) => {
            setMouseTrackData({
                x: event.clientX,
                y: event.clientY,
                screenSize,
            });
        };

        document.addEventListener('mousemove', trackMouse);

        return () => {
            document.removeEventListener('mousemove', trackMouse);
        };
    }, [screenSize]);

    return [mouseTrackData];
};

export { useTrackEvent, useMouseTrack, MousePosition };
