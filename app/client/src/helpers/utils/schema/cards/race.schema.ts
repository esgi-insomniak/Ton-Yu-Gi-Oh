import * as zod from "zod";
import { commonIdNameSchema } from "./common.schema";

export const raceSchema = commonIdNameSchema.extend({});

export const raceOneResponseSchema = zod.object({
  data: raceSchema,
});

export const raceArrayResponseSchema = zod.object({
  data: raceSchema.array(),
});