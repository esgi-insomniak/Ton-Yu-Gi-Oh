import { z, ZodSchema } from 'zod'

export type ApiRequestBody = BodyInit | null | undefined

export interface ApiRequestOptions<Body extends object> extends Omit<RequestInit, "body"> {
    url: string,
    body?: Body,
    token?: string | undefined
}

export type ApiRequestResponse<Schema extends ZodSchema> = Promise<z.infer<Schema>>;