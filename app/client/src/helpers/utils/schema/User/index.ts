import * as zod from 'zod';
import { cardSetSchema } from '../cards/card-set.schema';

export const userCardSetSchema = zod.object({
    id: zod.string(),
    userId: zod.string(),
    cardSet: cardSetSchema,
});

export const userCardSetSchemaPartial = zod.object({
    id: zod.string(),
    userId: zod.string(),
    cardSetId: zod.string(),
});

export const groupedUserCardSetSchema = zod.object({
    cardSetId: zod.string(),
    userCardSets: zod.array(userCardSetSchema),
});

export const userCardSetPartialResponseSchema = zod.object({
    data: zod.array(userCardSetSchemaPartial),
});

export const groupedUserCardSetPartialResponseSchema = zod.object({
    data: zod.array(groupedUserCardSetSchema),
});

export type groupedUserCardSetType = zod.infer<typeof groupedUserCardSetSchema>;
