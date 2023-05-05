import * as zod from 'zod';

export const loginSchema = zod.object({
    username: zod.string().min(3).max(20).regex(/^[a-zA-Z0-9]+$/),
    password: zod.string().min(3).max(20),
});

export const registerSchema = zod.object({
    username: zod.string().min(3).max(20),
    password: zod.string().min(3).max(20),
    email: zod.string().email(),
});

export const responseLoginSchema = zod.object({
    token: zod.string(),
});

export const responseRegisterSchema = zod.object({
    data: zod.object({
        id: zod.string(),
        username: zod.string(),
        email: zod.string(),
        phone: zod.string().nullable(),
        coins: zod.number(),
        roles: zod.array(zod.string()),
    }),
});

export const responseConfirmAccountSchema = zod.string();

export const resetPasswordMailSchema = zod.object({
    email: zod.string().email(),
});

export const resetPasswordSchema = zod.object({
    password: zod.string().min(3).max(20),
    confirmPassword: zod.string().min(3).max(20),
});

export type responseLoginSchemaType = zod.infer<typeof responseLoginSchema>;
export type responseRegisterSchemaType = zod.infer<typeof responseRegisterSchema>;
export type responseConfirmAccountSchemaType = zod.infer<typeof responseConfirmAccountSchema>;