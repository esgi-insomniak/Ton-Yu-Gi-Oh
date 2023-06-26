import * as zod from "zod";
import { commonIdNameSchema } from "./common.schema";

export const archetypeSchema = commonIdNameSchema.extend({});

export const archetypeOneResponseSchema = zod.object({
  data: archetypeSchema,
});

export const archetypeArrayResponseSchema = zod.object({
  data: archetypeSchema.array(),
});

export type ArchetypeI = zod.infer<typeof archetypeSchema>;