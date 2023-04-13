type EventProperties = Record<string, unknown>;

interface AnalyticsSDK {
    track(eventName: string, eventProperties?: EventProperties): void;
    identify(userId: string, userProperties?: EventProperties): void;
}

function createAnalyticsSDK(appId: string): AnalyticsSDK {
    function sendEvent(eventName: string, eventProperties: EventProperties = {}) {
        navigator.serviceWorker.ready.then((registration) => {
            registration.active?.postMessage({
                type: 'trackEvent',
                payload: { appId, eventName, eventProperties },
            });
        });
    }

    function sendIdentity(userId: string, userProperties: EventProperties = {}) {
        navigator.serviceWorker.ready.then((registration) => {
            registration.active?.postMessage({
                type: 'identify',
                payload: { appId, userId, userProperties },
            });
        });
    }

    return {
        track: sendEvent,
        identify: sendIdentity,
    };
}

export default createAnalyticsSDK;
