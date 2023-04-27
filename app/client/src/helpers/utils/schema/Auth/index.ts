import * as zod from 'zod';

export const loginSchema = zod.object({
    username: zod.string().min(3).max(20).regex(/^[a-zA-Z0-9]+$/),
    password: zod.string().min(3).max(20),
});

export const registerSchema = zod.object({
    username: zod.string().min(3).max(20),
    password: zod.string().min(3).max(20),
    email: zod.string().email(),
    firstName: zod.string().min(3).max(20),
    lastName: zod.string().min(3).max(20),
});

export const responseLoginSchema = zod.object({
    token: zod.string(),
});

export const responseRegisterSchema = zod.object({
    id: zod.string(),
    username: zod.string(),
    email: zod.string(),
    phone: zod.string(),
    coins: zod.number(),
    roles: zod.array(zod.string()),
});

export type responseLoginSchemaType = zod.infer<typeof responseLoginSchema>;
export type responseRegisterSchemaType = zod.infer<typeof responseRegisterSchema>;