import * as zod from "zod";
import { cardPartialSchema } from "./card.schema";
import { setPartialSchema } from "./set.schema";
import { raritySchema } from "./rarity.schema";

export const cardSetSchema = zod.object({
  id: zod.string(),
  card: zod.lazy(() => cardPartialSchema),
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

export const cardSetOneResponseSchema = zod.object({
  data: cardSetSchema,
});

export const cardSetArrayResponseSchema = zod.object({
  data: cardSetSchema.array(),
});