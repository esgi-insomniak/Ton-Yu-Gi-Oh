import * as zod from "zod";
import { commonIdNameSchema } from "./common.schema";

export const linkMarkerSchema = commonIdNameSchema.extend({});

export const linkMarkerOneResponseSchema = zod.object({
  data: linkMarkerSchema,
});

export const linkMarkerArrayResponseSchema = zod.object({
  data: linkMarkerSchema.array(),
});