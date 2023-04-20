import React, { RefObject } from "react"
import { getScreenSize } from "../common";

type TypeOfEvent = "click" | "hover" | "scroll" | "time";
interface TrackEventProps {
    tag: string;
    type: TypeOfEvent;
    clientId?: string;
    appId?: string;
}

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
 * This is a TypeScript function that creates a hook to track events on a specified HTML element and
 * send the data to a server.
 * @param {TrackEventProps}  - The `useTrackEvent` function takes in an object with two properties:
 * @returns The `useTrackEvent` function returns an object with a single property `ref`, which is a
 * `React.useRef` object that can be attached to a DOM element. The `ref` is used to add an event
 * listener to the DOM element, which sends a tracking event to a server when the specified event type
 * is triggered on the element.
 */
const useTrackEvent = <TargetElement extends HTMLElement>({ tag, type, clientId, appId }: TrackEventProps) => {
    const ref = React.useRef<TargetElement | null>(null);

    React.useEffect(() => {
        const track = () => {
            navigator.sendBeacon("/api/track", JSON.stringify({
                event: type,
                tag,
                timestamp: Date.now(),
                clientId,
                appId
            }));

        };

        if (ref.current) {
            ref.current.addEventListener(type, track);
        }

        return () => {
            if (ref.current) {
                ref.current.removeEventListener(type, track);
            }
        }
    }, [ref]);

    return {
        ref
    };
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


export { useTrackEvent, useTrackMouseMovement }
export type { TrackEventProps, TrackMouseMovementProps, TrackMouseMouvementType }