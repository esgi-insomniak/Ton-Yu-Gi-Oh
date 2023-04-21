import React, { RefObject } from "react"
import { getScreenSize } from "../common";

interface TrackMouseMovementProps {
    x: number;
    y: number;
    timestamp: number;
    screenSize: ReturnType<typeof getScreenSize>;
}

interface TrackMouseMouvementType {
    ref: RefObject<Element>;
    appId: string;
    clientId: string;
}

/**
 * This function tracks mouse movement and sends data to a server for analytics purposes.
 * @param {TrackMouseMouvementType}  - - `ref`: a reference to the DOM element that the mouse movement
 * is being tracked on
 * @returns The function `useTrackMouseMovement` returns an object of type `TrackMouseMovementProps`,
 * which contains the current mouse position, timestamp, and screen size.
 */
const useTrackMouseMovement = ({ ref, appId, clientId }: TrackMouseMouvementType): TrackMouseMovementProps => {
    const [mousePosition, setMousePosition] = React.useState<TrackMouseMovementProps>({
        x: 0,
        y: 0,
        timestamp: 0,
        screenSize: getScreenSize(window)
    });

    const handleMouseMove = (event: MouseEvent) => {
        const { clientX, clientY, timeStamp } = event;
        setMousePosition({
            x: clientX,
            y: clientY,
            timestamp: timeStamp,
            screenSize: getScreenSize(window)
        });
    };

    React.useEffect(() => {
        const track = () => {
            navigator.sendBeacon("/api/track", JSON.stringify({
                event: "mouseMovement",
                tag: "mouseMovement",
                timestamp: mousePosition.timestamp,
                clientId,
                appId,
                mousePosition
            }));
        };

        if (ref.current) {
            ref.current.addEventListener("mousemove", () => handleMouseMove);
            ref.current.addEventListener("mouseleave", track);
        }

        return () => {
            if (ref.current) {
                ref.current.removeEventListener("mousemove", () => handleMouseMove);
                ref.current.removeEventListener("mouseleave", track);
            }
        }
    }, [mousePosition]);

    return mousePosition;

}

export { useTrackMouseMovement }
export type { TrackMouseMovementProps }