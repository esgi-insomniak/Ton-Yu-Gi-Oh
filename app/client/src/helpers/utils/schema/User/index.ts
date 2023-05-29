import * as zod from 'zod';

export const userCardSetsSchema = zod.object({
    id: zod.string(),
    userId: zod.string(),
    cardSetId: zod.string(),
});

export const userCardSetsResponseSchema = zod.object({
    data: zod.array(userCardSetsSchema),
});