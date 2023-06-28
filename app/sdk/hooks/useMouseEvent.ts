import React, { RefObject, MouseEvent } from "react"
import { apiRequest, getScreenSize, throttle } from "../common";
import { useTrackingContext } from "../providers";

interface TrackMouseMovementProps {
    x: number;
    y: number;
    timestamp: number;
    screenSize: ReturnType<typeof getScreenSize>;
}

interface TrackMouseMouvementType {
    ref: RefObject<Element>;
}

/**
 * This function tracks mouse movement and sends data to a server for analytics purposes.
 * @param {TrackMouseMouvementType}  - - `ref`: a reference to the DOM element that the mouse movement
 * is being tracked on
 * @returns The function `useTrackMouseMovement` returns an object of type `TrackMouseMovementProps`,
 * which contains the current mouse position, timestamp, and screen size.
 */
const useTrackMouseMovement = ({ ref }: TrackMouseMouvementType): TrackMouseMovementProps => {

    const { visitorId, appId } = useTrackingContext()
    const [mousePosition, setMousePosition] = React.useState<TrackMouseMovementProps>({
        x: 0,
        y: 0,
        timestamp: 0,
        screenSize: getScreenSize(window)
    });

    const handleMouseMove = (event: MouseEvent<Element, MouseEvent>): void => {
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
            apiRequest({
                beacon: true,
                url: "/mouse-track",
                method: "POST",
                payload: {
                    event: "mouse",
                    timestamp: Date.now(),
                    visitorId,
                    appId,
                    mousePosition,
                    pageUrl: window.location.href
                }
            })
        };

        let handleThrottledMouseMove: EventListenerOrEventListenerObject | null = null

        if (ref.current) {
            handleThrottledMouseMove = throttle(handleMouseMove, 100)
            ref.current.addEventListener("mousemove", handleThrottledMouseMove);
            ref.current.addEventListener("mouseleave", track);
        }

        return () => {
            if (ref.current) {
                ref.current.removeEventListener("mousemove", handleThrottledMouseMove as EventListenerOrEventListenerObject);
                ref.current.removeEventListener("mouseleave", track);
            }
        }
    }, [mousePosition]);

    return mousePosition;

}

export { useTrackMouseMovement }
export type { TrackMouseMovementProps }