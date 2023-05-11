import * as zod from 'zod';

const sendPayementIcToStripeSchema = zod.object({
    productId: zod.string(),
});

const responseSendPayementIcToStripeSchema = zod.object({
    data: zod.object({
        sessionId: zod.string(),
        payementStatus: zod.string(),
        url: zod.string(),
        coins: zod.number(),
    }),
});

export { sendPayementIcToStripeSchema, responseSendPayementIcToStripeSchema }