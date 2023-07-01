import * as zod from "zod";
import { userSchema } from "../Auth";
import { userCardSetSchema } from "../User";

export const exchangeSchema = zod.object({
  id: zod.string(),
  exchangeOwner: userSchema,
  exchangeTarget: userSchema,
  ownerAccepted: zod.boolean(),
  targetAccepted: zod.boolean(),
  isClosed: zod.boolean(),
  ownerCoinsProposed: zod.number(),
  targetCoinsProposed: zod.number(),
  ownerCardSetsProposed: userCardSetSchema.array(),
  targetCardSetsProposed: userCardSetSchema.array(),
});

export type exchangeType = zod.infer<typeof exchangeSchema>;

export const exchangeOneResponseSchema = zod.object({
  data: exchangeSchema,
});

export const exchangeArrayResponseSchema = zod.object({
  data: exchangeSchema.array(),
});
