import uap from 'ua-parser-js';
import * as inso from '../common';

/**
 * The function sends a POST request to a specified API endpoint with a JSON object and authorization
 * headers.
 * @param event - The `event` parameter is an object that contains the data for the event that needs to
 * be sent to the server. This could include information such as the event name, timestamp, user ID,
 * and any other relevant data.
 * @param secret - The `secret` parameter is an object that contains two properties: `app_id` and
 * `app_secret`. These properties are used to authenticate the request being made to the API endpoint.
 * The `app_id` and `app_secret` are combined and encoded in base64 format and sent as the value
 */
function sendEvent(event: any, secret: { app_id: string; app_secret: string }): void {
    inso.apiRequest({
        url: '/api/events',
        method: 'POST',
        headers: {
            'Authorization': "Basic" + Buffer.from(`${secret.app_id}:${secret.app_secret}`).toString('base64')
        },
        payload: event,
    });
}

interface UserData {
    ip: string;
    ua: uap.IResult;
    referer: string;
    url: string;
    method: string;
}

interface Config {
    appId: string;
    secret: string;
}

export default function tracker(config: Config): (req: any, _: any, __: any) => void {
    const secretData = {
        app_id: config.appId,
        app_secret: config.secret,
    };

    return (req: any, _: any, __: any): void => {
        const userData: UserData = {
            ip: req.ip,
            ua: uap(req.headers['user-agent']),
            referer: req.get('Referrer') || req.get('Referer'),
            url: req.originalUrl,
            method: req.method,
        };

        req.sendTrackingEvent = (event: any): void => {
            sendEvent({
                ...event,
                ...userData,
            }, secretData);
        };
    };
}
