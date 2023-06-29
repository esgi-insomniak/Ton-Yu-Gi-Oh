import * as zod from "zod";
import { setPartialSchema } from "../cards/set.schema";

export const userSchema = zod.object({
    id: zod.string(),
    username: zod.string(),
    email: zod.string(),
    phone: zod.string().nullable(),
    roles: zod.array(zod.string()),
    coins: zod.number(),
    isOnline: zod.boolean().nullable(),
});

export const getAllUsersSchema = zod.object({
    data: zod.array(userSchema),
});

export const responsePatchUserSchema = zod.object({
    data: userSchema,
});

export const createPromoCodeWithCoinsSchema = zod.object({
    code: zod.string().nonempty({ message: "Le code ne peut pas être vide" }),
    rewardCoinsAmount: zod.number().positive({ message: "C'est de l'arnaque si on donne moins que 0 Coins" }),
    expirationDate: zod.string(),
});

export const createPromoCodeWithSetSchema = zod.object({
    code: zod.string().nonempty({ message: "Le code ne peut pas être vide" }),
    rewardSetId: zod.string().nonempty({ message: "Selectionner un code booster " }),
    rewardSetAmount: zod.number().positive({ message: "C'est de l'arnaque si on donne moins que 0 boosters" }),
    expirationDate: zod.string(),
});

export const sendPatchPromoCodeSchema = zod.object({
    code: zod.string().nonempty({ message: "Le code ne peut pas être vide" }),
    rewardCoinsAmount: zod.number().positive({ message: "C'est de l'arnaque si on donne moins que 0 Coins" }).nullable(),
    rewardSetId: zod.string().nonempty({ message: "Selectionner un code booster " }).nullable(),
    rewardSetAmount: zod.number().positive({ message: "C'est de l'arnaque si on donne moins que 0 boosters" }).nullable(),
    expirationDate: zod.string().nullable(),
});
export const responsePaymentHistorySchema = zod.object({
    id: zod.string(),
    userId: zod.string(),
    coinsAmount: zod.number(),
    stripeInfo: zod.string(),
    sessionId: zod.string(),
});

export const responseGetAllPromoCodesSchema = zod.object({
    data: zod.array(responsePaymentHistorySchema),
});

export const AuthLogSchema = zod.object({
    id: zod.string(),
    ipAddress: zod.string(),
    isSuccess: zod.boolean(),
    createdAt: zod.string(),
    user: userSchema.nullable(),
});

export const responseAuthSchema = zod.object({
    data: zod.array(AuthLogSchema),
});

export type getAllUsersSchemaType = zod.infer<typeof getAllUsersSchema>;
export type userSchemaType = zod.infer<typeof userSchema>;
export type createPromoCodeWithCoinsSchemaType = zod.infer<typeof createPromoCodeWithCoinsSchema>;
export type createPromoCodeWithSetSchemaType = zod.infer<typeof createPromoCodeWithSetSchema>;
export type sendPatchPromoCodeSchemaType = zod.infer<typeof sendPatchPromoCodeSchema>;
export type responsePaymentHistorySchemaType = zod.infer<typeof responsePaymentHistorySchema>;
export type responseGetAllPromoCodesSchemaType = zod.infer<typeof responseGetAllPromoCodesSchema>;
export type responseAuthSchemaType = zod.infer<typeof responseAuthSchema>;
export type responsePatchUserSchemaType = zod.infer<typeof responsePatchUserSchema>;
export type AuthLogSchemaType = zod.infer<typeof AuthLogSchema>;
