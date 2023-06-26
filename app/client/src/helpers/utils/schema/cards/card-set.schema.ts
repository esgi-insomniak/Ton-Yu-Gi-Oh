import * as zod from "zod";
import { cardSchema } from "./card.schema";
import { setPartialSchema } from "./set.schema";
import { raritySchema } from "./rarity.schema";

export const cardSetSchema = zod.object({
  id: zod.string(),
  card: zod.lazy(() => cardSchema.omit({ cardSets: true })),
  set: zod.lazy(() => setPartialSchema),
  rarity: zod.lazy(() => raritySchema),
  price: zod.number(),
});

export const cardSetPartialSchema = zod.object({
  id: zod.string(),
  card: zod.string().optional(),
  set: zod.string().optional(),
  rarity: zod.string().optional(),
  price: zod.number(),
});

export const cardSetBuyableSchema = zod.object({
  id: zod.string().uuid(),
  userId: zod.string().uuid(),
  set: zod.object({
    id: zod.string().uuid(),
    name: zod.string(),
    code: zod.string(),
    image: zod.string(),
  }),
});

export const cardSetOneResponseSchema = zod.object({
  data: cardSetSchema,
});

export const cardSetArrayResponseSchema = zod.object({
  data: cardSetSchema.array(),
});
