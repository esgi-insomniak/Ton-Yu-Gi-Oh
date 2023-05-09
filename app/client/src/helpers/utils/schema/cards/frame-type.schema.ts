import * as zod from "zod";
import { commonIdNameSchema } from "./common.schema";

export const frameTypeSchema = commonIdNameSchema.extend({});

export const frameTypeOneResponseSchema = zod.object({
  data: frameTypeSchema,
});

export const frameTypeArrayResponseSchema = zod.object({
  data: frameTypeSchema.array(),
});