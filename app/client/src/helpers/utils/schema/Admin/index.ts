import * as zod from "zod";

export const userSchema = zod.object({
    id: zod.string(),
    username: zod.string(),
    email: zod.string(),
    phone: zod.string().nullable(),
    roles: zod.array(zod.string()),
    coins: zod.number(),
    isOnline: zod.boolean(),
});

export const getAllUsersSchema = zod.object({
    data: zod.array(userSchema),
});

export type getAllUsersSchemaType = zod.infer<typeof getAllUsersSchema>;
export type userSchemaType = zod.infer<typeof userSchema>;