import * as zod from 'zod';
import { setPartialSchema } from '../cards/set.schema';

const sendPayementIcToStripeSchema = zod.object({
    productId: zod.string(),
});

const responseSendPayementIcToStripeSchema = zod.object({
    data: zod.object({
        sessionId: zod.string(),
        url: zod.string(),
    }),
});

const responseConfirmPayementIcToStripeSchema = zod.object({
    data: zod.object({
        sessionId: zod.string(),
        paymentStatus: zod.string(),
        url: zod.string(),
        coins: zod.number(),
    }),
});

const sendBuyAmountSchema = zod.object({
    amount: zod.number(),
});

const responseBuyBoosterSchema = zod.object({
    data: zod.array(zod.object({
        id: zod.string(),
        set: zod.object({
            id: zod.string(),
            name: zod.string(),
            code: zod.string(),
            image: zod.string(),
        }),
        userId: zod.string()
    })),
});

const responsePromoCodeSchema = zod.object({
    data: zod.object({
        id: zod.string(),
        code: zod.string(),
        rewardCoinsAmount: zod.number().nullable(),
        rewardSet: setPartialSchema.nullable(),
        rewardSetAmount: zod.number().nullable(),
        expirationDate: zod.string().nullable(),
    }),
});

type responseSendPayementIcToStripeSchemaType = zod.infer<typeof responseSendPayementIcToStripeSchema>;
type responseConfirmPayementIcToStripeSchemaType = zod.infer<typeof responseConfirmPayementIcToStripeSchema>;
type responseBuyBoosterSchemaType = zod.infer<typeof responseBuyBoosterSchema>;
type responsePromoCodeSchemaType = zod.infer<typeof responsePromoCodeSchema>;

export { sendPayementIcToStripeSchema, responseSendPayementIcToStripeSchema, responseConfirmPayementIcToStripeSchema, sendBuyAmountSchema, responseBuyBoosterSchema, responsePromoCodeSchema }
export type { responseSendPayementIcToStripeSchemaType, responseConfirmPayementIcToStripeSchemaType, responseBuyBoosterSchemaType, responsePromoCodeSchemaType }