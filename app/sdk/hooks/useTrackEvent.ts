import React from "react";
import { useTrackingContext } from "../providers";
import { apiRequest } from "../common";

type TypeOfEvent = "click" | "hover" | "scroll" | "time";

interface TrackEventProps {
    tag: string;
    type: TypeOfEvent;
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
export const useTrackEvent = <TargetElement extends HTMLElement>({ tag, type }: TrackEventProps) => {
    const ref = React.useRef<TargetElement | null>(null);

    const { visitorId, appId } = useTrackingContext()

    React.useEffect(() => {
        const track = () => {
            apiRequest({
                beacon: true,
                url: "/track",
                method: "POST",
                payload: {
                    event: type,
                    tag,
                    timestamp: Date.now(),
                    visitorId,
                    appId
                }
            })
        };

        if (ref.current) {
            ref.current.addEventListener(type, track);
        }

        return () => {
            if (ref.current) {
                ref.current.removeEventListener(type, track);
            }
        }
    }, [ref, visitorId]);

    return {
        ref
    };
}