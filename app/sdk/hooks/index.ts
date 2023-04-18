import React from "react"
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
    clientId?: string;
    appId?: string;
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
 * This function tracks mouse movement on a specified target element and sends the data to a server for
 * tracking purposes.
 * @param {TrackMouseMovementProps}  - - `TargetElement`: a generic type parameter that extends
 * `HTMLElement`, which represents the type of the element that the mouse movement is being tracked on.
 * @returns The `useTrackMouseMovement` function returns an object with a single property `ref`, which
 * is a `React.RefObject` that can be attached to a DOM element. This ref is used to track mouse
 * movement on the element and send data to a server using the `navigator.sendBeacon` method.
 */
const useTrackMouseMovement = <TargetElement extends HTMLElement>({ x, y, clientId, appId }: TrackMouseMovementProps) => {
    const ref = React.useRef<TargetElement | null>(null);

    React.useEffect(() => {
        const track = () => {
            const screenSize = getScreenSize(window);
            navigator.sendBeacon("/api/track", JSON.stringify({
                event: "mouse-movement",
                x,
                y,
                screenSize,
                timestamp: Date.now(),
                clientId,
                appId
            }));

        };

        if (ref.current) {
            ref.current.addEventListener("mousemove", track);
        }

        return () => {
            if (ref.current) {
                ref.current.removeEventListener("mousemove", track);
            }
        }
    }, [ref]);

    return {
        ref
    };
}


export { useTrackEvent, useTrackMouseMovement }
export type { TrackEventProps, TrackMouseMovementProps }